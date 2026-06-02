const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Catálogo de Produtos API',
    description: 'API REST para gerenciamento de produtos com autenticação JWT'
  },
  host: 'localhost:3000',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Insira o token assim: Bearer <seu_token>'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);