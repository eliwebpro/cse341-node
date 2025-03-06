require('dotenv').config(); // Carregar variáveis do .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

    const app = express();
    const port = process.env.PORT || 3000;

    // Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/Tododb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Conectado ao MongoDB!"))
    .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar e registrar rotas
var routes = require('./api/routes/todoListRoutes'); //importando a rota
routes(app); // registrando a rota


app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta: ${port}`);
});
