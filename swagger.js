const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Catalogo de Categorias API',
    description: 'API REST com MySQL para autenticacao e CRUD protegido de categorias',
  },
  host: 'localhost:3000',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Insira o token assim: Bearer <seu_token>',
    },
    userIdAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-user-id',
      description: 'Informe o ID do usuario autenticado',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
