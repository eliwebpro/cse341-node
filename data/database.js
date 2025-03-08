const dotenv = require('dotenv');
const e = require('express');

dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log("DB Initialized!");
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            database = client.db();
            console.log("DB Initialized!");
            callback(null, database);
        })
        .catch((err) => {
            console.warn("Error connecting to the database");
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized!");
    }
    return database;
};

exports.initDb = initDb;