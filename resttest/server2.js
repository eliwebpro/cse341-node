require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./data/database'); 
const routes = require('./routes'); 

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/', routes);


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("Server failed to start:", error);
});
