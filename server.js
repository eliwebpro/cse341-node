require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/', require('./routes')); 

mongodb.initDb((err) => {
    if (err) {
        console.error("Error to connect to MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    }
});
