const Product = require('../models/Product');

/**
 * Cria um novo produto associado ao usuario autenticado.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo os dados do produto no corpo e o usuario autenticado em req.user.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o produto criado ou mensagens de erro.
 * @returns {Promise<void>} Retorna uma resposta JSON com status 201 quando o produto e criado.
 * @throws {Error} Retorna status 400 caso os dados enviados nao atendam ao schema do produto.
 */
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({ message: 'Produto criado', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Lista produtos cadastrados com filtros opcionais por categoria e faixa de preco.
 *
 * @param {import('express').Request} req - Requisicao HTTP com filtros opcionais em req.query: category, minPrice e maxPrice.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar a lista de produtos encontrados.
 * @returns {Promise<void>} Retorna uma resposta JSON com a quantidade e a lista de produtos.
 * @throws {Error} Retorna status 500 caso ocorra falha na consulta ao banco de dados.
 */
exports.getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).populate('createdBy', 'name email');
    res.json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Busca um produto pelo identificador informado na URL.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo o id do produto em req.params.id.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o produto encontrado ou status 404.
 * @returns {Promise<void>} Retorna uma resposta JSON com os dados do produto encontrado.
 * @throws {Error} Retorna status 500 caso ocorra erro ao buscar o produto.
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name');
    if (!product) return res.status(404).json({ message: 'Produto nao encontrado' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Atualiza um produto existente pelo identificador informado na URL.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo o id em req.params.id e os novos dados do produto em req.body.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o produto atualizado ou mensagens de erro.
 * @returns {Promise<void>} Retorna uma resposta JSON com o produto atualizado.
 * @throws {Error} Retorna status 400 quando os dados enviados sao invalidos.
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: 'Produto nao encontrado' });

    res.json({ message: 'Produto atualizado', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Remove um produto pelo identificador informado na URL.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo o id do produto em req.params.id.
 * @param {import('express').Response} res - Resposta HTTP usada para confirmar a exclusao ou retornar status 404.
 * @returns {Promise<void>} Retorna uma resposta JSON confirmando a exclusao do produto.
 * @throws {Error} Retorna status 500 caso ocorra erro ao remover o produto.
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto nao encontrado' });

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
