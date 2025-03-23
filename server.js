require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json()); 
app.use('/', require('./routes')); 

const port = process.env.PORT || 8080;

mongodb.initDb((err) => {
    if (err) {
        console.error("Error to connect to MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    }
});
