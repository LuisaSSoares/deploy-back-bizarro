const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const connection = require('./db_config'); // Ensure this path is correct
const upload = require('./multer'); // Multer configuration for handling file uploads

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

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));

// ---------------------- USER ROUTES ----------------------- //

// User registration route
app.post('/usuario/cadastrar', async (request, response) => {
    const { nome, cpf, email, telefone, senha } = request.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(senha, 10);
    const perfil = 'usuario'; // Default profile is 'usuario'

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

// User login route
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
                // Create a session for the user
                req.session.user = {
                    id: user.idusuario,
                    email: user.email,
                    perfil: user.perfil
                };

                res.json({
                    success: true,
                    message: 'Login realizado com sucesso!',
                    data: user
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
app.put('/usuario/editar/:id', (req, res) => {    
    const params = [req.body.nome, req.body.email, req.params.id];
 
    const query = "UPDATE usuario SET nome = ?, email = ? WHERE idusuario = ?";
    
    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao editar o perfil do usuário",
                error: err
            });
        }
        res.status(200).json({
            success: true,
            message: "Perfil do usuário atualizado com sucesso",
            data: results
        });
    });
});
 
// Rota GET para listar usuários (todos os perfis podem acessar)
app.get('/usuario/listar', (request, response) => {
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
 
 
// ---------------------- PRODUCT ROUTES ----------------------- //

// Route to list all products
app.get('/produtos/listar', (request, response) => {
    const query = "SELECT * FROM produto";

    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Produtos carregados com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao carregar produtos",
                data: err
            });
        }
    });
});

// Route to create a new product (Admin only)
app.post('/produtos/cadastrar', upload.single('imagem'), checkAdmin, (request, response) => {
    const { nome, preco, descricao } = request.body;
    const imagem = `/uploads/${request.file.filename}`; // Get the image path from multer

    const params = [nome, preco, descricao, imagem];
    const query = "INSERT INTO produto(nome, preco, descricao, imagem) VALUES(?, ?, ?, ?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Produto cadastrado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o produto",
                data: err
            });
        }
    });
});

// Route to edit an existing product (Admin only)
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

// Route to delete a product (Admin only)
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

// ---------------------- CART ROUTES ----------------------- //

// Route to add a product to the cart
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

// Route to get products from the user's cart
app.get('/carrinho/:usuario_id', (request, response) => {
    const usuario_id = request.params.usuario_id;

    const query = `SELECT p.* FROM produto p
                   JOIN carrinho c ON p.idproduto = c.produto_id
                   WHERE c.usuario_id = ?`;

    connection.query(query, [usuario_id], (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Carrinho carregado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao carregar o carrinho",
                data: err
            });
        }
    });
});

// ---------------------- IMAGE UPLOADS ----------------------- //

// Static folder for product images
app.use('/uploads', express.static(__dirname + '/produtos'));

