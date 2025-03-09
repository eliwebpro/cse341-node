const express = require('express');
const router = express.Router();
const mongodb = require('../data/database');

router.get('/professional', async (req, res) => {
    try {
        console.log("GET /professional");
        const db = mongodb.getDatabase();
        const data = await db.collection('test').findOne();

        if (!data) {
            return res.status(404).json({ message: "Nenhum dado encontrado" });
        }

        // **Garante que o JSON esteja formatado corretamente para o frontend**
        const response = {
            _id: data._id,
            professionalName: data.professionalName || "",
            nameLink: data.nameLink || { firstName: "", url: "" },
            base64Image: data.base64Image || "",
            primaryDescription: data.primaryDescription || "",
            workDescription1: data.workDescription1 || "",
            workDescription2: data.workDescription2 || "",
            linkTitleText: data.linkTitleText || "",
            linkedInLink: data.linkedInLink || { link: "", text: "" },
            githubLink: data.githubLink || { link: "", text: "" },
            contactText: data.contactText || ""
        };

        res.status(200).json(response);

    } catch (error) {
        console.error("Erro ao buscar profissional:", error);
        res.status(500).json({ message: "Erro no servidor" });
    }
});

module.exports = router;
