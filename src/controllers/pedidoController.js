const pedidoModel = require('../models/pedidoModel');

const idInvalido = (id) => !Number.isInteger(Number(id)) || Number(id) <= 0;

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoModel.findAll();
    res.json({ count: pedidos.length, pedidos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pedidos', error: error.message });
  }
};

exports.buscarPedidoPorId = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do pedido invalido' });
    }
    const pedido = await pedidoModel.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido nao encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message });
  }
};

exports.criarPedido = async (req, res) => {
  try {
    const { id_cliente, itens } = req.body;
    if (!id_cliente || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ message: 'id_cliente e itens sao obrigatorios' });
    }
    const pedido = await pedidoModel.create({ id_cliente, itens });
    res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
  }
};

exports.atualizarStatusPedido = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do pedido invalido' });
    }
    const { status } = req.body;
    const statusValidos = ['pendente', 'aprovado', 'enviado', 'entregue', 'cancelado'];
    if (!status || !statusValidos.includes(status)) {
      return res.status(400).json({ message: `Status invalido. Use: ${statusValidos.join(', ')}` });
    }
    const pedido = await pedidoModel.updateStatus(req.params.id, status);
    if (!pedido) return res.status(404).json({ message: 'Pedido nao encontrado' });
    res.json({ message: 'Status do pedido atualizado com sucesso', pedido });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error: error.message });
  }
};

exports.removerPedido = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID do pedido invalido' });
    }
    const removido = await pedidoModel.remove(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Pedido nao encontrado' });
    res.json({ message: 'Pedido removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover pedido', error: error.message });
  }
};
