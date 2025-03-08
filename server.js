require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const routes = require('./routes'); // Import routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/', routes); // Use routes from routes/index.js

// Initialize Database and Start Server
mongodb.initDb((err) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});
