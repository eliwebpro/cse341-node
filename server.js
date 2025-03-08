require('dotenv').config(); // Load .env variables
const express = require('express');
const mongodb = require('./data/database/database');

const app = express();
const port = process.env.PORT || 3000;

// Initialize MongoDB connection
mongodb.initDb((err) => {
    if (err) {
        console.error("Error to connect to MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Server runing on port: ${port}`);
        });
    }
});
