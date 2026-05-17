const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Cadastro de novo usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Bloqueia se o email já estiver cadastrado
    const emailExiste = await User.findOne({ email });
    if (emailExiste) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Criptografa a senha antes de salvar no banco
    const senhaCriptografada = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: senhaCriptografada });

    // Gera o token JWT válido por 7 dias
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Usuário criado com sucesso', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Login de usuário existente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    // Compara a senha digitada com a senha criptografada no banco
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