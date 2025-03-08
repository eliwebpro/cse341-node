const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello!! You are connected!');
});

router.use('/users', require('./users')); // Link user routes

module.exports = router;
