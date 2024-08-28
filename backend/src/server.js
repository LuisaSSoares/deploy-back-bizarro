const express = require('express');
const cors = require('cors');

const port = 3013;
const app = express()

app.use(cors());
app.use(express.json());

//ROTA DE CURTIR PRODUTOS

//Rota post para adicionar produtos curtidos

//Rota get para coletar produtos curtidos
app.get('http://localhost:3013/produto/produtosCurtidos', async (request, response) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtosCurtidos WHERE usuarioId = ?', [req.usuario.id]);
        request.json(rows);
    } catch (err) {
        response.status(500).send('Erro ao buscar produtos curtidos');
    }
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const connection = require('./db_config')

// ROTAS DE CADASTRO DO USUARIO

// Rota post para cadastrar novo usuario
app.post('/usuario/cadastrar', (request, response) => {
    // Criar um array com os dados recebidos
    let params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.cpf,
        request.body.fone
    )
    // Criar o comando de execucao no banco de dados
    let query = "INSERT INTO usuario(name,email,password,cpf,fone) VALUES(?,?,?,?,?);"
    // Passar o comando e os dados para funcao query
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
})
// Rota get para listar usuarios
app.get('/usuarios/listar', (request, response) => {
    const query = "SELECT * FROM usuario";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    succss: false,
                    message: "Sem Sucesso!",
                    data: err
                })
        }
    })
})

// Rota put para atualizar usuario
app.put('/usuarios/editar/:id', (request, response) => {
})
// Rota delete para deletar usuario
app.delete('/usuario/deletar/:id', (request, response) => {
})


