const clienteModel = require('../models/clienteModel');

const idInvalido = (id) => !Number.isInteger(Number(id)) || Number(id) <= 0;

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.findAll();
    res.json({ count: clientes.length, clientes });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar clientes', error: error.message });
  }
};

exports.buscarClientePorId = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do cliente invalido' });
    }
    const cliente = await clienteModel.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente nao encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
  }
};

exports.criarCliente = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email sao obrigatorios' });
    }
    const cliente = await clienteModel.create({ nome, email, telefone });
    res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'E-mail ja cadastrado' });
    }
    res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do cliente invalido' });
    }
    const { nome, email, telefone } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email sao obrigatorios' });
    }
    const cliente = await clienteModel.update(req.params.id, { nome, email, telefone });
    if (!cliente) return res.status(404).json({ message: 'Cliente nao encontrado' });
    res.json({ message: 'Cliente atualizado com sucesso', cliente });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'E-mail ja cadastrado' });
    }
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
};

exports.removerCliente = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do cliente invalido' });
    }
    const removido = await clienteModel.remove(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Cliente nao encontrado' });
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover cliente', error: error.message });
  }
};
