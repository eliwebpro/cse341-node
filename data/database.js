const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database already initialized!");
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGO_URI)
        .then(client => {
            database = client.db();
            console.log("Connected to MongoDB!");
            callback(null, database);
        })
        .catch(err => {
            console.error("Error connecting to the database:", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized!");
    }
    return database;
};

module.exports = { initDb, getDatabase };
