require('dotenv').config(); // Load .env variables
const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

// Initialize MongoDB connection
mongodb.initDb((err) => {
    if (err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`🚀 Servidor rodando na porta: ${port}`);
        });
    }
});
