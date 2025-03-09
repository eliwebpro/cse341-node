const express = require('express');
const { getDatabase } = require('../data/database');
const { ObjectId } = require('mongodb');

const router = express.Router();

// GET /professional - Fetch all data
router.get('/professional', async (req, res) => {
  try {
    const db = getDatabase();
    const collection = db.collection("test"); // Ensure correct collection name
    const data = await collection.find().toArray();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /professional - Add new entry
router.post('/professional', async (req, res) => {
  try {
    const db = getDatabase();
    const collection = db.collection("test");

    const newEntry = req.body;
    const result = await collection.insertOne(newEntry);

    res.status(201).json({ message: "Entry added", id: result.insertedId });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /professional/:id - Update entry
router.put('/professional/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const collection = db.collection("test");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedData = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Entry not found or no changes made" });
    }

    res.status(200).json({ message: "Entry updated successfully" });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /professional/:id - Remove entry
router.delete('/professional/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const collection = db.collection("test");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
