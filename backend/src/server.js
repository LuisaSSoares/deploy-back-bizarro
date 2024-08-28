const express = require('express');
const cors = require('cors');

const port = 3013;
const app = express()

app.use(cors());
app.use(express.json());

//ROTA DE CURTIR PRODUTOS


app.listen(port, () => console.log(`Rodando na porta ${port}`));

const connection = require('./db_config')

// ROTAS DE CADASTRO DO USUARIO

// Rota post para cadastrar novo usuario
app.post('/usuario/cadastrar', (request, response) => {
    // Criar um array com os dados recebidos
    let params = Array(
        request.body.nome,
        request.body.cpf,
        request.body.email,
        request.body.telefone,
        request.body.senha
    )
    // Criar o comando de execucao no banco de dados
    let query = "INSERT INTO usuario(nome,cpf,email,telefone,senha) VALUES(?,?,?,?,?);"
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

//ROTA DE LOGAR USUARIO




