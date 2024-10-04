const express = require("express");
const app = express();
const port = 3013;
const multer = require("multer");
const db = require("./db_config");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("src/produtos"));

// Configurando o multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/produtos");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s+/g, "_") + "_" + Date.now();
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Rota para servir arquivos estáticos (imagens)
app.use("/uploads", express.static("src/produtos"));

// ROTAS PARA USUÁRIOS

// Cadastro de usuários
app.post("/usuario/cadastrar", (req, res) => {
  const { nome, email, telefone, cpf, senha } = req.body;
  const sql = `INSERT INTO usuario (nome, email, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [nome, email, telefone, cpf, senha], (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: "Erro ao cadastrar usuário." });
    } else {
      res.json({ success: true, message: "Usuário cadastrado com sucesso." });
    }
  });
});

// Login de usuário
app.post("/usuario/login", (req, res) => {
  const { email, senha } = req.body;
  const sql = `SELECT * FROM usuario WHERE email = ? AND senha = ?`;

  db.query(sql, [email, senha], (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro no login." });
    } else if (result.length > 0) {
      res.json({ success: true, data: result[0] });
    } else {
      res.json({ success: false, message: "Usuário ou senha incorretos." });
    }
  });
});

// Edição de usuário
app.put("/usuario/editar/:id", (req, res) => {
  const { nome, email } = req.body;
  const { id } = req.params;
  const sql = `UPDATE usuario SET nome = ?, email = ? WHERE idusuario = ?`;

  db.query(sql, [nome, email, id], (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro ao atualizar usuário." });
    } else {
      res.json({ success: true, message: "Usuário atualizado com sucesso." });
    }
  });
});

// ROTAS PARA PRODUTOS

// Cadastro de produtos
app.post("/produtos/cadastrar", upload.single("imagem"), (req, res) => {
    const { nome, preco, descricao } = req.body;
    const imagem = req.file ? req.file.filename : null;

    if (!imagem) {
        return res.status(400).json({ success: false, message: "Erro no upload da imagem" });
    }

    const sql = `INSERT INTO produto (nome, preco, descricao, imagem) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nome, preco, descricao, imagem], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Erro ao cadastrar o produto" });
        }
        res.status(201).json({ success: true, message: "Produto cadastrado com sucesso" });
    });
});

// Listar produtos
app.get("/produtos/listar", (req, res) => {
  const sql = "SELECT * FROM produto";

  db.query(sql, (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro ao listar os produtos." });
    } else {
      res.json({ success: true, data: result });
    }
  });
});

// Edição de produto
app.put("/produtos/editar/:id", upload.single("imagem"), (req, res) => {
  const { nome, preco, descricao } = req.body;
  const { id } = req.params;
  const imagem = req.file ? req.file.filename : null;

  const sql = `UPDATE produto SET nome = ?, preco = ?, descricao = ?, imagem = ? WHERE idproduto = ?`;

  db.query(sql, [nome, preco, descricao, imagem, id], (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro ao atualizar o produto." });
    } else {
      res.json({ success: true, message: "Produto atualizado com sucesso." });
    }
  });
});

// Excluir produto
app.delete("/produtos/excluir/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM produto WHERE idproduto = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro ao excluir o produto." });
    } else {
      res.json({ success: true, message: "Produto excluído com sucesso." });
    }
  });
});

// ROTAS PARA CARRINHO

// Adicionar produto ao carrinho
app.post("/carrinho/adicionar", (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;
  const sql = `INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)`;

  db.query(sql, [usuario_id, produto_id, quantidade], (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro ao adicionar produto ao carrinho." });
    } else {
      res.json({ success: true, message: "Produto adicionado ao carrinho." });
    }
  });
});

// Listar produtos no carrinho de um usuário
app.get("/carrinho/:usuario_id", (req, res) => {
  const { usuario_id } = req.params;
  const sql = `SELECT p.nome, p.preco, p.imagem, c.quantidade 
               FROM carrinho c 
               JOIN produto p ON c.produto_id = p.idproduto 
               WHERE c.usuario_id = ?`;

  db.query(sql, [usuario_id], (err, result) => {
    if (err) {
      res.json({ success: false, message: "Erro ao listar os produtos do carrinho." });
    } else {
      res.json({ success: true, data: result });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
