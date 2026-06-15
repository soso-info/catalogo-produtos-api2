const mongoose = require('mongoose');

/**
 * Representa um usuario cadastrado para autenticacao na API.
 *
 * @typedef {Object} UserDocument
 * @property {string} name - Nome do usuario.
 * @property {string} email - E-mail unico usado para login.
 * @property {string} password - Senha criptografada armazenada no banco.
 */

/**
 * Schema Mongoose responsavel por validar e mapear os dados de usuarios.
 *
 * @type {import('mongoose').Schema<UserDocument>}
 * @throws {import('mongoose').Error.ValidationError} Disparado quando dados obrigatorios ou invalidos sao enviados.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome e obrigatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-mail e obrigatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Senha e obrigatoria'],
    minlength: 6
  }
}, { timestamps: true });

/**
 * Model de persistencia para usuarios.
 *
 * Disponibiliza metodos do Mongoose como create e findOne para cadastro
 * e autenticacao de usuarios.
 *
 * @type {import('mongoose').Model<UserDocument>}
 * @returns {import('mongoose').Model<UserDocument>} Model usado pelos controllers de autenticacao.
 */
module.exports = mongoose.model('User', userSchema);
