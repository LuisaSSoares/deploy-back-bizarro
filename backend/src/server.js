const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const connection = require('./db_config'); // Ensure this path is correct

const port = 3013;
const app = express();

app.use(cors());
app.use(express.json());

// Set up session management
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.listen(port, () => console.log(`Server running on port ${port}`));

// ROTAS DE CADASTRO DO USUARIO

// Rota para cadastrar um novo usuário (perfil padrão é 'usuario')
app.post('/usuario/cadastrar', async (request, response) => {
    const { nome, cpf, email, telefone, senha } = request.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Set perfil to 'usuario' by default
    const perfil = 'usuario';

    const params = [nome, cpf, email, telefone, hashedPassword, perfil];
    const query = "INSERT INTO usuario(nome, cpf, email, telefone, senha, perfil) VALUES(?, ?, ?, ?, ?, ?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o usuário",
                data: err
            });
        }
    });
});

// Rota para login do usuário
app.post('/usuario/login', (req, res) => {
    const { email, senha } = req.body;

    const query = "SELECT * FROM usuario WHERE email = ?";

    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao realizar login:', err);
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }

        if (results.length > 0) {
            const user = results[0];

            const passwordMatch = await bcrypt.compare(senha, user.senha);
            if (passwordMatch) {
                // Creating a session for the user
                req.session.user = {
                    id: user.idusuario,
                    email: user.email,
                    perfil: user.perfil
                };

                res.json({
                    success: true,
                    message: 'Login realizado com sucesso!',
                    data: { id: user.idusuario, email: user.email, perfil: user.perfil }
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Senha incorreta'
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }
    });
});

// Middleware to check if the user is an admin
function checkAdmin(req, res, next) {
    if (req.session.user && req.session.user.perfil === 'admin') {
        return next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Acesso negado. Apenas administradores podem realizar essa ação.'
        });
    }
}

// Rota GET para listar usuários (todos os perfis podem acessar)
app.get('/usuarios/listar', (request, response) => {
    const query = "SELECT * FROM usuario";

    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Sem Sucesso!",
                data: err
            });
        }
    });
});

// Rota PUT para editar produto (apenas admin pode editar)
app.put('/produtos/editar/:id', checkAdmin, (req, res) => {
    const { id } = req.params;
    const { nome, preco, descricao, imagem } = req.body;

    const query = "UPDATE produto SET nome = ?, preco = ?, descricao = ?, imagem = ? WHERE idproduto = ?";
    const params = [nome, preco, descricao, imagem, id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao editar o produto",
                error: err
            });
        }
        res.status(200).json({
            success: true,
            message: "Produto editado com sucesso",
            data: results
        });
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

// Rota POST para curtir um produto
app.post('/curtir', (request, response) => {
    const { usuarioId, produtoId } = request.body;

    if (!usuarioId || !produtoId) {
        response.status(400).json({
            success: false,
            message: 'Usuário e produto são obrigatórios'
        });
        return;
    }

    const query = "INSERT INTO curtidas (usuario_id, produto_id) VALUES (?, ?)";
    connection.query(query, [usuarioId, produtoId], (err, results) => {
        if (err) {
            response.status(500).json({
                success: false,
                message: 'Erro ao curtir produto',
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: 'Produto curtido com sucesso',
                data: results
            });
        }
    });
});

// Rota GET para obter produtos curtidos de um usuário
app.get('/produtos/curtidos/:id', (request, response) => {
    const usuarioId = request.params.id;
    const query = 'SELECT p.* FROM produto p JOIN curtidas c ON p.idproduto = c.produto_id WHERE c.usuario_id = ?';

    connection.query(query, [usuarioId], (err, results) => {
        if (err) {
            response.status(500).json({
                success: false,
                message: 'Erro ao procurar produtos curtidos',
                error: err
            });
        }

        if (results.length > 0) {
            response.status(200).json({
                success: true,
                message: 'Produtos curtidos encontrados',
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: 'Nenhum produto curtido encontrado'
            });
        }
    });
});

// Rota POST para adicionar um produto ao carrinho
app.post('/carrinho/adicionar', (request, response) => {
    const { usuario_id, produto_id } = request.body;

    if (!usuario_id || !produto_id) {
        response.status(400).json({
            success: false,
            message: 'Usuário e produto são obrigatórios'
        });
        return;
    }

    const params = [usuario_id, produto_id];
    const query = "INSERT INTO carrinho(usuario_id, produto_id) VALUES(?, ?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Produto adicionado ao carrinho com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao adicionar o produto ao carrinho.",
                data: err
            });
        }
    });
});
