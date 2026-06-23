const connectDB = require('../config/database');

const { pool } = connectDB;

const clienteModel = {
  async findAll() {
    const [rows] = await pool.execute(
      'SELECT id_cliente, nome, email, telefone FROM clientes ORDER BY id_cliente'
    );
    return rows;
  },

  async findById(idCliente) {
    const [rows] = await pool.execute(
      'SELECT id_cliente, nome, email, telefone FROM clientes WHERE id_cliente = ? LIMIT 1',
      [idCliente]
    );
    return rows[0] || null;
  },

  async create({ nome, email, telefone }) {
    const [result] = await pool.execute(
      'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefone]
    );
    return this.findById(result.insertId);
  },

  async update(idCliente, { nome, email, telefone }) {
    const [result] = await pool.execute(
      'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id_cliente = ?',
      [nome, email, telefone, idCliente]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(idCliente);
  },

  async remove(idCliente) {
    const [result] = await pool.execute(
      'DELETE FROM clientes WHERE id_cliente = ?',
      [idCliente]
    );
    return result.affectedRows > 0;
  },
};

module.exports = clienteModel;
