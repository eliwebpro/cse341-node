exports.updateUser = async (req, res) => {
    const itemId = parseInt(req.params.id);
    const novaQuantidade = req.body.quantidade;
  
    const db = require('../data/database').getDb();
  
    try {
      const result = await db.collection('users').updateOne(
        { "Sun Tunnels.id": itemId },
        { $set: { "Sun Tunnels.$.quantidade": novaQuantidade } }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
  
      res.status(200).json({ message: "Atualizado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  