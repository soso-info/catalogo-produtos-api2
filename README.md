# catalogo-produtos-api2
# Catálogo de Produtos API

API REST para gerenciamento de produtos com atributos dinâmicos,
desenvolvida com Node.js, Express e MongoDB.

## Tecnologias
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (autenticação)
- BCrypt (criptografia de senhas)

## Como rodar o projeto

### Pré-requisitos
- Node.js v18+
- Conta no MongoDB Atlas

### Instalação
```bash
git clone https://github.com/soso-info/catalogo-produtos-api2.git
cd catalogo-produtos-api2
npm install
```

### Configurar variáveis de ambiente
Copie o arquivo de exemplo e preencha com seus dados:
```bash
cp .env.example .env
```

Edite o `.env` com sua string de conexão do MongoDB Atlas e uma chave JWT.

### Rodar o servidor
```bash
npm run dev   # desenvolvimento
npm start     # produção
```

O servidor sobe em: http://localhost:3000

## Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Registrar novo usuário |
| POST | /api/auth/login | Login e obtenção do token |

### Produtos (autenticação obrigatória)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/products | Listar todos os produtos |
| GET | /api/products/:id | Buscar produto por ID |
| POST | /api/products | Criar novo produto |
| PUT | /api/products/:id | Atualizar produto |
| DELETE | /api/products/:id | Deletar produto |

### Como autenticar
Após o login, inclua o token no header de cada requisição:

Authorization: Bearer SEU_TOKEN_AQUI

### Exemplo de corpo para criar produto
```json
{
  "name": "Notebook Dell",
  "description": "Notebook para uso profissional",
  "price": 3499.90,
  "category": "informatica",
  "stock": 10,
  "attributes": {
    "ram": "16GB",
    "processador": "Intel i5",
    "tela": "15.6 polegadas"
  }
}
```