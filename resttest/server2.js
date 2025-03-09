const express = require('express');
const cors = require('cors');
require('./data/database'); // Conexão com MongoDB

const app = express();
const port = 8080; // Mudamos para 8080 para corresponder ao script.js

app.use(cors());
app.use(express.json());

const routes = require('./routes/index');
app.use('/', routes); // Agora a rota principal é acessível direto sem "/api"

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
