const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professional');

// Definir rota para obter dados do banco de dados
router.get('/', professionalController.getData);

module.exports = router;
