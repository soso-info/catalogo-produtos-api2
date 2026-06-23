const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.use(authMiddleware);

router
  .route('/')
  .get(clienteController.listarClientes)
  .post(clienteController.criarCliente);

router
  .route('/:id')
  .get(clienteController.buscarClientePorId)
  .put(clienteController.atualizarCliente)
  .delete(clienteController.removerCliente);

module.exports = router;
