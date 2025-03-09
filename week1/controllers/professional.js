const express = require('express');
const router = express.Router();
const mongodb = require('../data/database');

router.get('/professional', async (req, res) => {
    try {
        console.log("GET /professional");
        const db = mongodb.getDatabase();
        const data = await db.collection('test').findOne();//test froom mongodb

        if (!data) {
            return res.status(404).json({ message: "Nenhum dado encontrado" });//404 not found
        }

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
        res.status(500).json({ message: "Erro no servidor" });//500 server error
    }
});

module.exports = router;
