const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async (callback) => {
    if (database) {
        console.log("✅ Banco de dados já inicializado!");
        return callback(null, database);
    }

    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        database = client.db("sample_airbnb");
        console.log("✅ Conectado ao MongoDB!");
        
        callback(null, database);
    } catch (err) {
        console.warn("❌ Erro ao conectar ao MongoDB:", err);
        callback(err);
    }
};

const getDb = () => {
    if (!database) {
        throw new Error("❌ Banco de dados não inicializado!");
    }
    return database;
};

module.exports = { initDb, getDb };
