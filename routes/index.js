const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API está funcionando 🚀');
});

router.use('/users', require('./users')); // Garante que a rota está correta

module.exports = router;
