const connectDB = require('../config/database');

const { pool } = connectDB;

const usuarioModel = {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    return rows[0] || null;
  },

  async findById(idUsuario) {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ? LIMIT 1',
      [idUsuario]
    );

    return rows[0] || null;
  },

  async create({ nome, email, senha }) {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );

    return this.findById(result.insertId);
  },
};

module.exports = usuarioModel;
