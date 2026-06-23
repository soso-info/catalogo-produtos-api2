const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.use(authMiddleware);

router
  .route('/')
  .get(pedidoController.listarPedidos)
  .post(pedidoController.criarPedido);

router
  .route('/:id')
  .get(pedidoController.buscarPedidoPorId)
  .put(pedidoController.atualizarStatusPedido)
  .delete(pedidoController.removerPedido);

module.exports = router;
