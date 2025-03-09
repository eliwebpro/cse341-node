require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const mongodb = require('./data/database');

const app = express(); 

const port = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json());
app.use('/', require('./controllers/professional'));

mongodb.initDb((err) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    }
});
