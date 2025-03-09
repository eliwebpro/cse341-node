const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async (callback) => {
    if (database) {
        console.log("Database is already initialized!");
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            database = client.db("resttest1"); // Nome do seu banco de dados
            console.log("resttest1 database initialized!");
            callback(null, database);
        })
        .catch((err) => {
            console.error("Database connection error:", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized!");
    }
    console.log("Accessing database");
    return database;
};

module.exports = { initDb, getDatabase };
