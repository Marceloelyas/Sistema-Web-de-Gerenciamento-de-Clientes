const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// CRUD Routes
router.post('/', clientController.createClient);
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
