const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const senhaConfere = async (senhaInformada, senhaSalva) => {
  if (!senhaSalva) {
    return false;
  }

  const senhaCriptografada = senhaSalva.startsWith('$2a$') || senhaSalva.startsWith('$2b$');

  if (senhaCriptografada) {
    return bcrypt.compare(senhaInformada, senhaSalva);
  }

  return senhaInformada === senhaSalva;
};

/**
 * Registra um novo usuario na base relacional e retorna um token JWT.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo name/nome, email e password/senha em req.body.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o token criado ou mensagens de erro.
 * @returns {Promise<void>} Retorna uma resposta JSON com status 201 quando o usuario e criado.
 * @throws {Error} Retorna status 500 caso ocorra erro no cadastro.
 */
exports.register = async (req, res) => {
  try {
    const { name, nome, email, password, senha } = req.body;
    const nomeUsuario = nome || name;
    const senhaUsuario = senha || password;

    if (!nomeUsuario || !email || !senhaUsuario) {
      return res.status(400).json({ message: 'Nome, email e senha sao obrigatorios' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET nao configurado' });
    }

    const emailExiste = await usuarioModel.findByEmail(email);
    if (emailExiste) {
      return res.status(400).json({ message: 'E-mail ja cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senhaUsuario, 12);
    const usuario = await usuarioModel.create({
      nome: nomeUsuario,
      email,
      senha: senhaCriptografada,
    });

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, id: usuario.id_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'Usuario criado com sucesso', usuario, token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * Autentica um usuario existente na base MySQL e retorna um token JWT.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo email e password/senha em req.body.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o token de login ou erro de autenticacao.
 * @returns {Promise<void>} Retorna uma resposta JSON com o token quando as credenciais sao validas.
 * @throws {Error} Retorna status 500 caso ocorra erro no login.
 */
exports.login = async (req, res) => {
  try {
    const { email, password, senha } = req.body;
    const senhaInformada = senha || password;

    if (!email || !senhaInformada) {
      return res.status(400).json({ message: 'Email e senha sao obrigatorios' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET nao configurado' });
    }

    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    const senhaCorreta = await senhaConfere(senhaInformada, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, id: usuario.id_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};
