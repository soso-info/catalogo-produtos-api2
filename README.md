# Catalogo de Produtos API - MySQL

API REST em Node.js migrada de NoSQL para MySQL. Esta versao implementa autenticacao relacional e CRUD protegido apenas para categorias, conforme o escopo da atividade.

## Tecnologias

- Node.js
- Express
- MySQL
- mysql2 com Promises
- JSON Web Token
- bcryptjs
- dotenv
- Swagger

## Estrutura

```text
database/
  loja.sql
src/
  config/
    database.js
  controllers/
    authController.js
    categoriaController.js
    clienteController.js
    pedidoController.js
    produtoController.js
  middlewares/
    authMiddleware.js
  models/
    categoriaModel.js
    clienteModel.js
    pedidoModel.js
    produtoModel.js
    usuarioModel.js
  routes/
    apiRoutes.js
    authRoutes.js
    categoriaRoutes.js
    clientesRoutes.js
    pedidosRoutes.js
    produtosRoutes.js
  app.js
server.js
```

## Configuracao

Crie o arquivo `.env` na raiz:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=loja
DB_CONNECTION_LIMIT=10
JWT_SECRET=sua_chave_secreta_aqui
```

Execute o script do banco:

```bash
mysql -u root -p < database/loja.sql
```

Instale e rode:

```bash
npm install
npm run dev
```

## Rotas publicas

```http
GET /api/status
GET /api/versao
```

Resposta:

```json
{
  "versao": "2.0.0",
  "status": "online"
}
```

## Autenticacao

```http
POST /api/auth/login
```

Corpo:

```json
{
  "email": "admin@loja.com",
  "password": "admin123"
}
```

O script `database/loja.sql` cria esse usuario inicial.

## Categorias

Todas as rotas de categorias exigem os dois headers:

```http
Authorization: Bearer SEU_TOKEN
x-user-id: 1
```

Sem token, a API retorna `401 Unauthorized`. Sem o ID do usuario ou com ID diferente do token, retorna `403 Forbidden`.

| Metodo | Rota | Acao |
| --- | --- | --- |
| GET | `/api/categorias` | Lista categorias |
| GET | `/api/categorias/:id` | Busca categoria |
| POST | `/api/categorias` | Cria categoria |
| PUT | `/api/categorias/:id` | Atualiza categoria |
| DELETE | `/api/categorias/:id` | Remove categoria |

Exemplo de criacao:

```json
{
  "nome": "Games"
}
```

## Rotas futuras (estrutura criada, CRUD a implementar)

As rotas abaixo ja existem na estrutura (models, controllers e routes criados), mas o CRUD completo sera implementado em tarefas futuras, conforme o escopo da atividade.

| Modulo | Rotas | Autenticacao |
| --- | --- | --- |
| Produtos | `/api/produtos` e `/api/produtos/:id` | Sim (Bearer + x-user-id) |
| Clientes | `/api/clientes` e `/api/clientes/:id` | Sim (Bearer + x-user-id) |
| Pedidos | `/api/pedidos` e `/api/pedidos/:id` | Sim (Bearer + x-user-id) |

## Demonstracao sugerida

1. Acesse `GET /api/status` sem autenticar.
2. Tente `GET /api/categorias` sem headers e mostre o bloqueio.
3. Faca login em `POST /api/auth/login`.
4. Use o token e o `id_usuario` retornado nos headers.
5. Crie ou altere uma categoria.
6. Consulte a tabela `categorias` no MySQL para confirmar a persistencia.
