const connectDB = require('../config/database');

const { pool } = connectDB;

const produtoModel = {
  async findAll() {
    const [rows] = await pool.execute(
      'SELECT id_produto, nome, descricao, preco, estoque, id_categoria FROM produtos ORDER BY id_produto'
    );
    return rows;
  },

  async findById(idProduto) {
    const [rows] = await pool.execute(
      'SELECT id_produto, nome, descricao, preco, estoque, id_categoria FROM produtos WHERE id_produto = ? LIMIT 1',
      [idProduto]
    );
    return rows[0] || null;
  },

  async create({ nome, descricao, preco, estoque, id_categoria }) {
    const [result] = await pool.execute(
      'INSERT INTO produtos (nome, descricao, preco, estoque, id_categoria) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, estoque, id_categoria]
    );
    return this.findById(result.insertId);
  },

  async update(idProduto, { nome, descricao, preco, estoque, id_categoria }) {
    const [result] = await pool.execute(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, id_categoria = ? WHERE id_produto = ?',
      [nome, descricao, preco, estoque, id_categoria, idProduto]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(idProduto);
  },

  async remove(idProduto) {
    const [result] = await pool.execute(
      'DELETE FROM produtos WHERE id_produto = ?',
      [idProduto]
    );
    return result.affectedRows > 0;
  },
};

module.exports = produtoModel;
