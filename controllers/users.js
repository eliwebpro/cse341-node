const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); 

//GET all users
const getAllUsers = async (req, res) => {
    try {
        console.log("GET /users");
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//GET user by ID
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

//POST
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !birthday) {
            return res.status(400).json({ message: "Fields (firstName, lastName, email, birthday) are required." });
        }

        const db = mongodb.getDatabase();
        const result = await db.collection('users').insertOne({ firstName, lastName, email, favoriteColor, birthday });

        res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//PUT
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "At least one field must be provided for update." });
        }

        const db = mongodb.getDatabase();
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//DELETE
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const db = mongodb.getDatabase();
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
