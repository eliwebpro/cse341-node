require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const professionalRoutes = require('./routes/professional');



const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/professional', professionalRoutes);

// 🛑 O servidor agora ESPERA a conexão antes de iniciar
mongodb.initDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando e conectado ao MongoDB na porta ${port}`);
  });
});
