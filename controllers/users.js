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
// post
const createUser = async (req, res) => {
    try {
      const { tipo, nome, quantidade } = req.body;
  
      if (!tipo || !nome || quantidade === undefined) {
        return res.status(400).json({ message: "Campos 'tipo', 'nome' e 'quantidade' são obrigatórios." });
      }
  
      const db = mongodb.getDatabase();
      const result = await db.collection('users').insertOne({
        tipo,
        nome,
        quantidade
      });
  
      res.status(201).json({
        message: "Item de estoque criado com sucesso",
        itemId: result.insertedId
      });
    } catch (error) {
      console.error("Erro ao criar item:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
// put
const updateUser = async (req, res) => {
    try {
      const itemId = req.params.id;
      const updateFields = req.body;
  
      if (!ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: "Formato de ID inválido" });
      }
  
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "Envie ao menos um campo para atualizar." });
      }
  
      const db = mongodb.getDatabase();
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(itemId) },
        { $set: updateFields }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Item não encontrado" });
      }
  
      res.status(200).json({ message: "Item atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
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
