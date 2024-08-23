const express = require('express');
const cors = require('cors');

const port = 3002;
const app = express()

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const connection = require('./db_config')