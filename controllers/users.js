const mongodb = require('../data/database');

const getAllUsers = async (req, res) => {
    try {
        console.log("📥 Recebendo requisição GET /users");
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find().toArray();

        console.log("📂 Usuários encontrados:", users); // Log para depuração

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Nenhum usuário encontrado." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};

module.exports = { getAllUsers };
