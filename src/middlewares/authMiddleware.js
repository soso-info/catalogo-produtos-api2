const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const idUsuarioHeader = req.headers['x-user-id'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token nao fornecido.' });
  }

  if (!idUsuarioHeader) {
    return res.status(403).json({ message: 'Acesso negado. ID do usuario nao fornecido.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const idUsuarioToken = decoded.id_usuario || decoded.id;

    if (!idUsuarioToken || Number(idUsuarioHeader) !== Number(idUsuarioToken)) {
      return res.status(403).json({ message: 'Acesso negado. ID do usuario invalido.' });
    }

    const usuario = await usuarioModel.findById(idUsuarioToken);
    if (!usuario) {
      return res.status(403).json({ message: 'Acesso negado. Usuario nao encontrado.' });
    }

    req.user = {
      id: usuario.id_usuario,
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalido ou expirado.' });
  }
};

module.exports = protect;
