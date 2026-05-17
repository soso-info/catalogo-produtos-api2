const express = require('express');
const router = express.Router();

// Importa o middleware que verifica se o usuário está logado
const protect = require('../middlewares/authMiddleware');

// Importa todas as funções do controller de produtos
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Todas as rotas abaixo exigem que o usuário esteja logado
router.use(protect);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;