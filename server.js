require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para processar JSON no body das requisições
app.use('/', require('./routes')); // Inclui todas as rotas

mongodb.initDb((err) => {
    if (err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`🚀 Servidor rodando na porta: ${port}`);
        });
    }
});
