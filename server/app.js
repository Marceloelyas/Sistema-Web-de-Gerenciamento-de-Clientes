const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clients', clientRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = app;
