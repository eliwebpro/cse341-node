const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all users
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get a single user
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('users').findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

module.exports = { getAll, getSingle };
