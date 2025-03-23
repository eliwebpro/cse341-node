const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// ✅ Servindo a documentação Swagger corretamente
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Adicionando rotas de usuários
const usersRoutes = require('./users');
router.use('/users', usersRoutes);

// ✅ Rota padrão para verificar se a API está rodando
router.get('/', (req, res) => {
    res.json({ message: "🚀 API está rodando! Acesse /api-docs para ver a documentação." });
});

module.exports = router;
