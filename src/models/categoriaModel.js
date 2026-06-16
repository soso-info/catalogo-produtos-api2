const connectDB = require('../config/database');

const { pool } = connectDB;

const categoriaModel = {
  async findAll() {
    const [rows] = await pool.execute(
      'SELECT id_categoria, nome FROM categorias ORDER BY id_categoria'
    );

    return rows;
  },

  async findById(idCategoria) {
    const [rows] = await pool.execute(
      'SELECT id_categoria, nome FROM categorias WHERE id_categoria = ? LIMIT 1',
      [idCategoria]
    );

    return rows[0] || null;
  },

  async create(nome) {
    const [result] = await pool.execute(
      'INSERT INTO categorias (nome) VALUES (?)',
      [nome]
    );

    return this.findById(result.insertId);
  },

  async update(idCategoria, nome) {
    const [result] = await pool.execute(
      'UPDATE categorias SET nome = ? WHERE id_categoria = ?',
      [nome, idCategoria]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findById(idCategoria);
  },

  async remove(idCategoria) {
    const [result] = await pool.execute(
      'DELETE FROM categorias WHERE id_categoria = ?',
      [idCategoria]
    );

    return result.affectedRows > 0;
  },
};

module.exports = categoriaModel;
