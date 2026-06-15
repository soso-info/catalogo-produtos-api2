# Catalogo de Produtos API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)

API REST desenvolvida em Node.js para cadastro, consulta, atualizacao e remocao de produtos.
O projeto utiliza arquitetura MVC com controllers, models, rotas e configuracao de banco separadas.
A autenticacao e feita com JWT, permitindo proteger as rotas de produtos para usuarios logados.

## Stack Tecnologica

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- nodemon

## Funcionalidades

- Cadastro de usuarios
- Login com geracao de token JWT
- Criacao de produtos autenticada
- Listagem de produtos com filtros opcionais
- Busca de produto por ID
- Atualizacao de produtos
- Remocao de produtos

## Estrutura do Projeto

```text
catalogo-produtos-api2/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   └── app.js
├── .env.example
├── package.json
├── README.md
└── server.js
```

## Pre-requisitos

- Node.js 18 ou superior
- npm
- Conta e cluster configurado no MongoDB Atlas

## Instalacao e Execucao

Clone o repositorio:

```bash
git clone https://github.com/soso-info/catalogo-produtos-api2.git
```

Acesse a pasta do projeto:

```bash
cd catalogo-produtos-api2
```

Instale as dependencias:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Execute em modo de desenvolvimento:

```bash
npm run dev
```

Execute em modo de producao:

```bash
npm start
```

Servidor padrao:

```text
http://localhost:3000
```

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com os campos abaixo. Nao publique senhas reais no GitHub.

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/NOME_DO_BANCO?retryWrites=true&w=majority
MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8
JWT_SECRET=sua_chave_secreta_aqui
```

## Endpoints

### Autenticacao

| Metodo | Rota | Descricao |
| --- | --- | --- |
| POST | `/api/auth/register` | Registra um novo usuario |
| POST | `/api/auth/login` | Autentica um usuario e retorna um token |

### Produtos

As rotas abaixo exigem token JWT no header `Authorization`.

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/api/products` | Lista produtos cadastrados |
| GET | `/api/products/:id` | Busca um produto pelo ID |
| POST | `/api/products` | Cria um novo produto |
| PUT | `/api/products/:id` | Atualiza um produto existente |
| DELETE | `/api/products/:id` | Remove um produto |

## Autenticacao

Apos realizar login, envie o token JWT no header das requisicoes protegidas:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

## Exemplo de Produto

```json
{
  "name": "Notebook Dell",
  "description": "Notebook para uso profissional",
  "price": 3499.9,
  "category": "informatica",
  "stock": 10,
  "attributes": {
    "ram": "16GB",
    "processador": "Intel i5",
    "tela": "15.6 polegadas"
  }
}
```

## Documentacao Interna

Os arquivos de models e controllers possuem blocos JSDoc para auxiliar a leitura do codigo e o IntelliSense do VS Code:

- `src/models/Product.js`
- `src/models/User.js`
- `src/controllers/productController.js`
- `src/controllers/authController.js`
