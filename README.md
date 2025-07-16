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

```markdown

# **Detalhamento dos Arquivos Principais**

# **Backend** (Node.js/Express)

## **1.Configuração Principal**

     server/app.js: Configuração do Express e middlewares

     server/server.js: Inicialização do servidor

     server/config/db.js: Conexão com MongoDB

## **2.Autenticação**

     server/models/User.js: Modelo de usuário

     server/controllers/authController.js: Lógica de login/registro

     server/middleware/auth.js: Middleware de proteção de rotas

     server/routes/authRoutes.js: Rotas de autenticação

## **3.Clientes**

     server/models/Client.js: Modelo de cliente

     server/controllers/clientController.js: CRUD com paginação/filtros

     server/routes/clientRoutes.js: Rotas de clientes protegidas

## **4.Documentos**

     server/models/Document.js: Modelo de documento

     server/controllers/documentController.js: Upload/download de arquivos

     server/routes/documentRoutes.js: Rotas de documentos

## **5.Utilitários**

     server/utils/errorResponse.js: Formato padrão para erros

     server/middleware/async.js: Wrapper para async/await


# **Frontend**

## **1.Autenticação**

     client/login.html: Página de login

     client/css/auth.css: Estilos da página de login

     client/js/auth.js: Gerenciamento de autenticação

## **2.Dashboard Principal**

     client/index.html: Página principal com dashboard

     client/css/styles.css: Estilos principais

     client/js/script.js: Lógica do dashboard e CRUD

## **3.Gerenciamento de Documentos**

     client/client-details.html: Detalhes do cliente com documentos

     client/js/document-manager.js: Upload/download de arquivos

# **Fluxo do Sistema Atualizado**

## **1.Autenticação:**

     Usuário acessa /login.html

     Faz login (autenticação JWT)

     Redirecionado para /index.html (dashboard)

## **2.Gerenciamento de Clientes:**

     Dashboard mostra estatísticas e lista paginada

     Filtros avançados por status/busca

     CRUD completo de clientes

## **3.Documentos:**

     Na página de detalhes do cliente

     Upload de múltiplos documentos

     Download/exclusão de arquivos

## **4.Segurança:**

     Todas as rotas protegidas por JWT

     Controle de acesso por roles (user/admin)

     Proteção contra XSS/CSRF
```
