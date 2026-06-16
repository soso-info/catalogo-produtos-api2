CREATE DATABASE IF NOT EXISTS loja
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE loja;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email, senha)
VALUES (
  'Administrador',
  'admin@loja.com',
  '$2b$12$qy.HzZAsedBulkhxPEseXuwEa7KvGsP4nWGzO0hBie72Y8hYkbXju'
)
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO categorias (nome)
VALUES ('Informatica'), ('Eletronicos'), ('Vestuario')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);
