document.addEventListener('DOMContentLoaded', function() {
  // Elementos da interface
  const addClientBtn = document.getElementById('addClientBtn');
  const clientModal = document.getElementById('clientModal');
  const closeModal = document.querySelector('.close');
  const clientForm = document.getElementById('clientForm');
  const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
  
  // Variáveis de estado
  let isEditMode = false;
  let currentClientId = null;
  
  // Event Listeners
  addClientBtn.addEventListener('click', openAddClientModal);
  closeModal.addEventListener('click', closeClientModal);
  window.addEventListener('click', outsideModalClick);
  clientForm.addEventListener('submit', handleFormSubmit);
  
  // Carregar clientes ao iniciar
  loadClients();
  
  // Funções
  function openAddClientModal() {
    isEditMode = false;
    currentClientId = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Novo Cliente';
    clientForm.reset();
    clientModal.style.display = 'block';
  }
  
  function openEditClientModal(client) {
    isEditMode = true;
    currentClientId = client._id;
    document.getElementById('modalTitle').textContent = 'Editar Cliente';
    
    // Preencher formulário com dados do cliente
    document.getElementById('clientId').value = client._id;
    document.getElementById('name').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone;
    document.getElementById('businessType').value = client.businessType;
    document.getElementById('projectDescription').value = client.projectDescription;
    document.getElementById('status').value = client.status;
    
    clientModal.style.display = 'block';
  }
  
  function closeClientModal() {
    clientModal.style.display = 'none';
  }
  
  function outsideModalClick(e) {
    if (e.target === clientModal) {
      closeClientModal();
    }
  }
  
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const clientData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      businessType: document.getElementById('businessType').value,
      projectDescription: document.getElementById('projectDescription').value,
      status: document.getElementById('status').value
    };
    
    try {
      let response;
      if (isEditMode) {
        response = await updateClient(currentClientId, clientData);
      } else {
        response = await createClient(clientData);
      }
      
      if (response) {
        closeClientModal();
        loadClients();
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Ocorreu um erro ao salvar o cliente. Por favor, tente novamente.');
    }
  }
  
  async function loadClients() {
    try {
      const response = await fetch('http://localhost:5000/api/clients');
      const clients = await response.json();
      
      clientsTable.innerHTML = '';
      
      clients.forEach(client => {
        const row = document.createElement('tr');
        
        // Formatando a data
        const registrationDate = new Date(client.registrationDate);
        const formattedDate = registrationDate.toLocaleDateString('pt-BR');
        
        // Criando o badge de status
        let statusClass = '';
        switch(client.status) {
          case 'active':
            statusClass = 'status-active';
            break;
          case 'inactive':
            statusClass = 'status-inactive';
            break;
          default:
            statusClass = 'status-potential';
        }
        
        row.innerHTML = `
          <td>${client.name}</td>
          <td>${client.email}</td>
          <td>${client.phone}</td>
          <td>${client.businessType}</td>
          <td><span class="status-badge ${statusClass}">${getStatusText(client.status)}</span></td>
          <td>
            <button class="action-btn edit-btn" data-id="${client._id}">Editar</button>
            <button class="action-btn delete-btn" data-id="${client._id}">Excluir</button>
          </td>
        `;
        
        clientsTable.appendChild(row);
      });
      
      // Adicionar event listeners aos botões de ação
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
          const clientId = this.getAttribute('data-id');
          const client = await getClientById(clientId);
          if (client) {
            openEditClientModal(client);
          }
        });
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
          const clientId = this.getAttribute('data-id');
          if (confirm('Tem certeza que deseja excluir este cliente?')) {
            await deleteClient(clientId);
            loadClients();
          }
        });
      });
      
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  }
  
  function getStatusText(status) {
    switch(status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      default: return 'Potencial';
    }
  }
  
  // Funções de API
  async function createClient(clientData) {
    const response = await fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
    });
    
    return await response.json();
  }
  
  async function getClientById(clientId) {
    const response = await fetch(`http://localhost:5000/api/clients/${clientId}`);
    return await response.json();
  }
  
  async function updateClient(clientId, clientData) {
    const response = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
    });
    
    return await response.json();
  }
  
  async function deleteClient(clientId) {
    const response = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
      method: 'DELETE'
    });
    
    return await response.json();
  }
});
