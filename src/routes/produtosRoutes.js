const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.use(authMiddleware);

router
  .route('/')
  .get(produtoController.listarProdutos)
  .post(produtoController.criarProduto);

router
  .route('/:id')
  .get(produtoController.buscarProdutoPorId)
  .put(produtoController.atualizarProduto)
  .delete(produtoController.removerProduto);

module.exports = router;
