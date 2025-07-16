# Sistema de Gerenciamento de Clientes - Web Designer Varago

## Estrutura do Projeto

```
web-designer-varago/
├── client/                      # Frontend
│   ├── css/
│   │   ├── styles.css           # Estilos principais
│   │   └── auth.css             # Estilos de autenticação
│   ├── js/
│   │   ├── script.js            # Lógica principal
│   │   ├── auth.js              # Autenticação
│   │   └── document-manager.js  # Gerenciamento de documentos
│   ├── index.html               # Página principal (dashboard)
│   ├── login.html               # Página de login
│   ├── client-details.html      # Detalhes do cliente com documentos
│   └── ...                     # Outras páginas HTML
├── server/                      # Backend
│   ├── config/                  # Configurações
│   │   └── db.js                # Configuração do banco de dados
│   ├── controllers/
│   │   ├── authController.js    # Controle de autenticação
│   │   ├── clientController.js  # Controle de clientes (CRUD)
│   │   └── documentController.js # Controle de documentos
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticação
│   │   └── async.js             # Handler para async/await
│   ├── models/
│   │   ├── Client.js            # Modelo de cliente
│   │   ├── Document.js          # Modelo de documento
│   │   └── User.js              # Modelo de usuário
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   ├── clientRoutes.js      # Rotas de clientes
│   │   └── documentRoutes.js    # Rotas de documentos
│   ├── utils/
│   │   └── errorResponse.js     # Formato de erros padrão
│   ├── uploads/                 # Armazenamento de documentos
│   ├── app.js                   # Configuração do Express
│   ├── server.js                # Ponto de entrada do servidor
│   └── .env                     # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
└── README.md                    # Documentação do projeto
```
