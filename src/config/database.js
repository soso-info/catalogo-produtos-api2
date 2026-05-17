// Importa a biblioteca mongoose para conectar ao MongoDB
const mongoose = require('mongoose');

// Função assíncrona que realiza a conexão com o banco de dados
const connectDB = async () => {
  try {
    // Tenta conectar usando a URL definida no arquivo .env
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    // Se der erro na conexão, mostra a mensagem e encerra o processo
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

// Exporta a função para ser usada em outros arquivos
module.exports = connectDB;