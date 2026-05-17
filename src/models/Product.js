const mongoose = require('mongoose');

// Schema que define a estrutura do produto no banco
const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },

  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['eletronicos', 'vestuario', 'alimentos', 'informatica', 'outros']
  },

  stock: {
    type: Number,
    default: 0,
    min: 0
  },

  // Atributos dinâmicos — cada categoria tem os seus próprios
  attributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Guarda qual usuário criou o produto
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);