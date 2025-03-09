const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db("restest1"); 
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
    }
};

const getDatabase = () => db;

module.exports = { connectDB, getDatabase };
