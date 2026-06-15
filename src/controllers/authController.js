const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Registra um novo usuario e retorna um token JWT de autenticacao.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo name, email e password em req.body.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o token criado ou mensagens de erro.
 * @returns {Promise<void>} Retorna uma resposta JSON com status 201 quando o usuario e criado.
 * @throws {Error} Retorna status 500 caso ocorra erro no cadastro.
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExiste = await User.findOne({ email });
    if (emailExiste) {
      return res.status(400).json({ message: 'E-mail ja cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: senhaCriptografada });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Usuario criado com sucesso', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * Autentica um usuario existente e retorna um token JWT.
 *
 * @param {import('express').Request} req - Requisicao HTTP contendo email e password em req.body.
 * @param {import('express').Response} res - Resposta HTTP usada para retornar o token de login ou erro de autenticacao.
 * @returns {Promise<void>} Retorna uma resposta JSON com o token quando as credenciais sao validas.
 * @throws {Error} Retorna status 500 caso ocorra erro no login.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};
