const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async (callback) => {
    if (database) {
        console.log("✅ Database is already initialized!");
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            database = client.db("project1"); // Garante que está acessando "project1"
            console.log("✅ Database initialized!");
            callback(null, database);
        })
        .catch((err) => {
            console.error("❌ Database connection error:", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("❌ Database not initialized!");
    }
    console.log("📂 Acessando banco de dados...");
    return database;
};

module.exports = { initDb, getDatabase };
