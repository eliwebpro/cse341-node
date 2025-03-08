const mongodb = require('../data/database');

const getAllUsers = async (req, res) => {
    try {
        console.log("GET /users");
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find().toArray();

        console.log("Users:", users); // Log to users

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Not Found." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error to find users:", error);
        res.status(500).json({ message: "Error from server" });
    }
};

module.exports = { getAllUsers };
