const mongoose = require('mongoose');

/**
 * Representa um produto cadastrado no catalogo.
 *
 * @typedef {Object} ProductDocument
 * @property {string} name - Nome do produto.
 * @property {string} [description] - Descricao opcional do produto.
 * @property {number} price - Preco do produto.
 * @property {'eletronicos'|'vestuario'|'alimentos'|'informatica'|'outros'} category - Categoria do produto.
 * @property {number} stock - Quantidade disponivel em estoque.
 * @property {Record<string, unknown>} attributes - Atributos dinamicos do produto.
 * @property {import('mongoose').Types.ObjectId} createdBy - Usuario responsavel pelo cadastro.
 */

/**
 * Schema Mongoose responsavel por validar e mapear os dados de produtos.
 *
 * @type {import('mongoose').Schema<ProductDocument>}
 * @throws {import('mongoose').Error.ValidationError} Disparado quando dados obrigatorios ou invalidos sao enviados.
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome e obrigatorio'],
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  price: {
    type: Number,
    required: [true, 'Preco e obrigatorio'],
    min: [0, 'Preco nao pode ser negativo']
  },

  category: {
    type: String,
    required: [true, 'Categoria e obrigatoria'],
    enum: ['eletronicos', 'vestuario', 'alimentos', 'informatica', 'outros']
  },

  stock: {
    type: Number,
    default: 0,
    min: 0
  },

  attributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

/**
 * Model de persistencia para produtos.
 *
 * Disponibiliza metodos do Mongoose como create, find, findById,
 * findByIdAndUpdate e findByIdAndDelete para manipulacao da colecao.
 *
 * @type {import('mongoose').Model<ProductDocument>}
 * @returns {import('mongoose').Model<ProductDocument>} Model usado pelos controllers para acessar produtos.
 */
module.exports = mongoose.model('Product', productSchema);
