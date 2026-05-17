const Product = require('../models/Product');

// Criar novo produto
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

// Listar todos os produtos com filtros opcionais
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

// Buscar um produto pelo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name');
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar um produto pelo ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto atualizado', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar um produto pelo ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};