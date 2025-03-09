const { MongoClient } = require('mongodb'); 
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URI; 
const client = new MongoClient(mongoURI);
let database;

// Function to Connect to MongoDB
const connectDB = async () => {
  try {
    await client.connect();
    database = client.db("resttest1"); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

// Function to Get Database
const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized!");
  }
  return database;
};

//Export Functions Correctly
module.exports = { connectDB, getDatabase };
