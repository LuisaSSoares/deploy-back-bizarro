const express = require("express");
const app = express();
const port = 3013;
const multer = require("multer");
const db = require("./db_config");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("src/produtos"));

// Middleware function to validate if the user is an admin
function checkAdmin(req, res, next) {
  if (req.session.user && req.session.user.perfil === 'admin') {
      return next(); // If the user is an admin, proceed to the next middleware or route handler
  } else {
      return res.status(403).json({
          success: false,
          message: 'Acesso negado. Apenas administradores podem realizar essa ação.' // Access denied message
      });
  }
}

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

// Rota GET para obter os detalhes de um produto pelo ID
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM produto WHERE idproduto = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Erro ao buscar o produto:', err);
          return res.status(500).json({ success: false, message: 'Erro ao buscar o produto.' });
      }

      if (result.length === 0) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
      }

      res.json({ success: true, data: result[0] });
  });
});


// Edição de produto
app.put('/produtos/editar/:id', upload.single('imagem'), (req, res) => {
  const { nome, preco, descricao } = req.body;
  const { id } = req.params;
  const imagem = req.file ? req.file.filename : null;

  // First, fetch the existing product details
  const fetchSql = 'SELECT * FROM produto WHERE idproduto = ?';
  db.query(fetchSql, [id], (err, result) => {
      if (err) {
          console.error('Erro ao buscar o produto existente:', err);
          return res.status(500).json({ success: false, message: 'Erro ao buscar o produto.' });
      }

      const existingProduct = result[0];

      // Use the existing values if no new values are provided
      const updatedNome = nome || existingProduct.nome;
      const updatedPreco = preco || existingProduct.preco;
      const updatedDescricao = descricao || existingProduct.descricao;
      const updatedImagem = imagem || existingProduct.imagem;

      // Now, update the product with the new or existing values
      const updateSql = 'UPDATE produto SET nome = ?, preco = ?, descricao = ?, imagem = ? WHERE idproduto = ?';
      db.query(updateSql, [updatedNome, updatedPreco, updatedDescricao, updatedImagem, id], (err, result) => {
          if (err) {
              console.error('Erro ao atualizar o produto:', err);
              return res.status(500).json({ success: false, message: 'Erro ao atualizar o produto.' });
          }
          res.json({ success: true, message: 'Produto atualizado com sucesso.' });
      });
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

// Rota DELETE para deletar um produto do catálogo (apenas admin pode deletar)
app.delete('/produtos/excluir/:id', checkAdmin, (request, response) => {
  const { id } = request.params;
  const query = "DELETE FROM produto WHERE idproduto = ?";

  connection.query(query, [id], (err, results) => {
      if (err) {
          return response.status(500).json({
              success: false,
              message: "Erro ao excluir o produto",
              error: err
          });
      }
      response.status(200).json({
          success: true,
          message: "Produto excluído com sucesso",
          data: results
      });
  });
});

// Route to fetch products categorized as 'desconto'
app.get('/produtos/categoria/desconto', (req, res) => {
  const sql = 'SELECT * FROM produto WHERE categoria = "desconto"';

  db.query(sql, (err, result) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Erro ao buscar produtos com desconto.' });
      }

      res.json({ success: true, data: result });
  });
});

// Route to fetch products categorized as 'regular'
app.get('/produtos/categoria/regular', (req, res) => {
  const sql = 'SELECT * FROM produto WHERE categoria = "regular"';

  db.query(sql, (err, result) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Erro ao buscar produtos regulares.' });
      }

      res.json({ success: true, data: result });
  });
});

// ROTAS PARA CARRINHO

// Adicionar produto ao carrinho
app.post('/carrinho/adicionar', (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;

  const sql = `INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)`;

  db.query(sql, [usuario_id, produto_id, quantidade], (err, result) => {
      if (err) {
          console.error('Erro ao adicionar produto ao carrinho:', err);
          return res.status(500).json({ success: false, message: 'Erro ao adicionar produto ao carrinho.' });
      }

      res.json({ success: true, message: 'Produto adicionado ao carrinho com sucesso.' });
  });
});

// Fetch products in the cart for the logged-in user
app.get('/carrinho/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
      SELECT p.idproduto, p.nome, p.preco, p.descricao, p.imagem, c.quantidade 
      FROM carrinho c 
      JOIN produto p ON c.produto_id = p.idproduto 
      WHERE c.usuario_id = ?`;

  db.query(sql, [usuario_id], (err, result) => {
      if (err) {
          console.error('Erro ao buscar os produtos no carrinho:', err);
          return res.status(500).json({ success: false, message: 'Erro ao buscar os produtos no carrinho.' });
      }
      res.json({ success: true, data: result });
  });
});

//Limpar carrinho
app.delete('/carrinho/limpar/:usuarioID', (req, res) => {
  const { usuarioID } = req.params;
  const sql = 'DELETE FROM carrinho WHERE usuario_id = ?';

  db.query(sql, [usuarioID], (err, result) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Erro ao limpar o carrinho.' });
      }
      res.json({ success: true, message: 'Carrinho limpo com sucesso.' });
  });
});

//ROTAS PARA CURTIDOS

// Adding product to liked products (curtidos)
app.post("/curtidos/adicionar", (req, res) => {
  const { usuario_id, produto_id } = req.body;
  const sql = `INSERT INTO curtidas (usuario_id, produto_id) VALUES (?, ?)`;
  
  db.query(sql, [usuario_id, produto_id], (err, result) => {
      if (err) {
          res.json({ success: false, message: "Erro ao adicionar aos curtidos." });
      } else {
          res.json({ success: true, message: "Produto adicionado aos curtidos com sucesso." });
      }
  });
});

// Fetch liked products (curtidos) for the logged-in user
app.get('/curtidos/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT p.idproduto, p.nome, p.preco, p.descricao, p.imagem 
    FROM curtidas c 
    JOIN produto p ON c.produto_id = p.idproduto 
    WHERE c.usuario_id = ?`;

  db.query(sql, [usuario_id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar os produtos curtidos:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar os produtos curtidos.' });
    }
    res.json({ success: true, data: result });
  });
});

// Route to remove a product from curtidos (liked products)
app.delete('/curtidos/remover', (req, res) => {
  const { usuario_id, produto_id } = req.body;

  if (!usuario_id || !produto_id) {
      return res.status(400).json({ success: false, message: 'Dados insuficientes para remover curtidos.' });
  }

  const sql = `DELETE FROM curtidas WHERE usuario_id = ? AND produto_id = ?`;

  db.query(sql, [usuario_id, produto_id], (err, result) => {
      if (err) {
          console.error('Erro ao remover produto dos curtidos:', err);
          return res.status(500).json({ success: false, message: 'Erro ao remover produto dos curtidos.' });
      }

      if (result.affectedRows > 0) {
          res.json({ success: true, message: 'Produto removido dos curtidos com sucesso.' });
      } else {
          res.status(404).json({ success: false, message: 'Produto não encontrado nos curtidos.' });
      }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
