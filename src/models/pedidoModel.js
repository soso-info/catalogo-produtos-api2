const connectDB = require('../config/database');

const { pool } = connectDB;

const pedidoModel = {
  async findAll() {
    const [rows] = await pool.execute(
      `SELECT p.id_pedido, p.id_cliente, p.status, p.total, p.criado_em,
              c.nome AS cliente_nome
       FROM pedidos p
       LEFT JOIN clientes c ON c.id_cliente = p.id_cliente
       ORDER BY p.id_pedido`
    );
    return rows;
  },

  async findById(idPedido) {
    const [[pedido]] = await pool.execute(
      `SELECT p.id_pedido, p.id_cliente, p.status, p.total, p.criado_em,
              c.nome AS cliente_nome
       FROM pedidos p
       LEFT JOIN clientes c ON c.id_cliente = p.id_cliente
       WHERE p.id_pedido = ? LIMIT 1`,
      [idPedido]
    );
    if (!pedido) return null;

    const [itens] = await pool.execute(
      `SELECT ip.id_item, ip.id_produto, ip.quantidade, ip.preco_unitario,
              pr.nome AS produto_nome
       FROM itens_pedido ip
       LEFT JOIN produtos pr ON pr.id_produto = ip.id_produto
       WHERE ip.id_pedido = ?`,
      [idPedido]
    );

    return { ...pedido, itens };
  },

  async create({ id_cliente, status, itens }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [result] = await conn.execute(
        'INSERT INTO pedidos (id_cliente, status, total) VALUES (?, ?, 0)',
        [id_cliente, status || 'pendente']
      );
      const idPedido = result.insertId;

      let total = 0;
      for (const item of itens) {
        const [[prod]] = await conn.execute(
          'SELECT preco FROM produtos WHERE id_produto = ? LIMIT 1',
          [item.id_produto]
        );
        const precoUnitario = prod ? prod.preco : 0;
        const subtotal = precoUnitario * item.quantidade;
        total += subtotal;

        await conn.execute(
          'INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
          [idPedido, item.id_produto, item.quantidade, precoUnitario]
        );
      }

      await conn.execute('UPDATE pedidos SET total = ? WHERE id_pedido = ?', [total, idPedido]);
      await conn.commit();
      return this.findById(idPedido);
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async updateStatus(idPedido, status) {
    const [result] = await pool.execute(
      'UPDATE pedidos SET status = ? WHERE id_pedido = ?',
      [status, idPedido]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(idPedido);
  },

  async remove(idPedido) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute('DELETE FROM itens_pedido WHERE id_pedido = ?', [idPedido]);
      const [result] = await conn.execute('DELETE FROM pedidos WHERE id_pedido = ?', [idPedido]);
      await conn.commit();
      return result.affectedRows > 0;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};

module.exports = pedidoModel;
