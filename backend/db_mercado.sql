CREATE DATABASE db_mercado;
USE db_mercado;

CREATE TABLE usuario (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    senha VARCHAR(100) NOT NULL, 
    perfil ENUM('admin', 'usuario') DEFAULT 'usuario', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produto (
    idproduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carrinho (
    idcarrinho INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    produto_id INT,
    quantidade INT DEFAULT 1,
    data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE
);

CREATE TABLE curtidas (
    idcurtido INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    produto_id INT,
    data_curtido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE
);

CREATE TABLE compra (
    idcompra INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    valor_total DECIMAL(10, 2) NOT NULL,
    quantidade_produtos INT NOT NULL,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(idusuario) ON DELETE CASCADE
);

CREATE TABLE itens_compra (
    iditem INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT,
    produto_id INT,
    quantidade INT DEFAULT 1,
    preco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compra(idcompra) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(idproduto) ON DELETE CASCADE
);

select * from usuario