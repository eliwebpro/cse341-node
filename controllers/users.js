const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); 

const getAllUsers = async (req, res) => {
    try {
        console.log("GET /users");
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find().toArray();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const db = mongodb.getDatabase();
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, getUserById };
