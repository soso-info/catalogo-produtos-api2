const produtoModel = require('../models/produtoModel');

const idInvalido = (id) => !Number.isInteger(Number(id)) || Number(id) <= 0;

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.findAll();
    res.json({ count: produtos.length, produtos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do produto invalido' });
    }
    const produto = await produtoModel.findById(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto nao encontrado' });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, id_categoria } = req.body;
    if (!nome || preco == null) {
      return res.status(400).json({ message: 'Nome e preco sao obrigatorios' });
    }
    const produto = await produtoModel.create({ nome, descricao, preco, estoque: estoque ?? 0, id_categoria });
    res.status(201).json({ message: 'Produto criado com sucesso', produto });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do produto invalido' });
    }
    const { nome, descricao, preco, estoque, id_categoria } = req.body;
    if (!nome || preco == null) {
      return res.status(400).json({ message: 'Nome e preco sao obrigatorios' });
    }
    const produto = await produtoModel.update(req.params.id, { nome, descricao, preco, estoque, id_categoria });
    if (!produto) return res.status(404).json({ message: 'Produto nao encontrado' });
    res.json({ message: 'Produto atualizado com sucesso', produto });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

exports.removerProduto = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do produto invalido' });
    }
    const removido = await produtoModel.remove(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Produto nao encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover produto', error: error.message });
  }
};
