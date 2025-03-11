const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, world! You are conected!');
});

router.use('/users', require('./users')); 

module.exports = router;
