const categoriaModel = require('../models/categoriaModel');

const idInvalido = (id) => !Number.isInteger(Number(id)) || Number(id) <= 0;

exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.findAll();
    res.json({ count: categorias.length, categorias });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar categorias', error: error.message });
  }
};

exports.buscarCategoriaPorId = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID da categoria invalido' });
    }

    const categoria = await categoriaModel.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria nao encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categoria', error: error.message });
  }
};

exports.criarCategoria = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
      return res.status(400).json({ message: 'Nome da categoria e obrigatorio' });
    }

    const categoria = await categoriaModel.create(nome.trim());
    res.status(201).json({ message: 'Categoria criada com sucesso', categoria });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Categoria ja cadastrada' });
    }

    res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
  }
};

exports.atualizarCategoria = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID da categoria invalido' });
    }

    const { nome } = req.body;

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
      return res.status(400).json({ message: 'Nome da categoria e obrigatorio' });
    }

    const categoria = await categoriaModel.update(req.params.id, nome.trim());

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria nao encontrada' });
    }

    res.json({ message: 'Categoria atualizada com sucesso', categoria });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Categoria ja cadastrada' });
    }

    res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
  }
};

exports.removerCategoria = async (req, res) => {
  try {
    if (idInvalido(req.params.id)) {
      return res.status(400).json({ message: 'ID da categoria invalido' });
    }

    const removida = await categoriaModel.remove(req.params.id);

    if (!removida) {
      return res.status(404).json({ message: 'Categoria nao encontrada' });
    }

    res.json({ message: 'Categoria removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover categoria', error: error.message });
  }
};
