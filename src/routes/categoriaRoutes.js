const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.use(authMiddleware);

router
  .route('/')
  .get(categoriaController.listarCategorias)
  .post(categoriaController.criarCategoria);

router
  .route('/:id')
  .get(categoriaController.buscarCategoriaPorId)
  .put(categoriaController.atualizarCategoria)
  .delete(categoriaController.removerCategoria);

module.exports = router;
