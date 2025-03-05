const { MongoClient } = require('mongodb');
require('dotenv').config(); // Carregar variáveis do .env

async function main() {
    const uri = process.env.MONGO_URI; // Pegando a string de conexão do .env
    if (!uri) {
        console.error("❌ Erro: MONGO_URI não definido no .env");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Conectado ao MongoDB!");

        // Buscar listagens com critérios específicos
        await findListingsWithCriteria(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResults: 5
        });

        // Listar bancos de dados disponíveis
        await listDatabases(client);

    } catch (e) {
        console.error("❌ Erro na conexão:", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// 🔹 Função para buscar listagens com critérios específicos
async function findListingsWithCriteria(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = 5
} = {}) {
    try {
        const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
            .find({
                bedrooms: { $gte: minimumNumberOfBedrooms },
                bathrooms: { $gte: minimumNumberOfBathrooms }
            })
            .sort({ last_review: -1 }) // Ordenando pelo último review mais recente
            .limit(maximumNumberOfResults);

        const results = await cursor.toArray();

        if (results.length > 0) {
            console.log("\n🏠 Listagens encontradas:");
            results.forEach((result, i) => {
                console.log(`\n${i + 1}. 🏡 ${result.name || "Sem Nome"}`);
                console.log(`   📜 ${result.summary || "Sem descrição"}`);
                console.log(`   🛏️ Quartos: ${result.bedrooms} | 🚿 Banheiros: ${result.bathrooms}`);
                console.log(`   🗓️ Última Avaliação: ${result.last_review ? result.last_review.toISOString().split('T')[0] : "N/A"}`);
            });
        } else {
            console.log("⚠️ Nenhum resultado encontrado para os critérios fornecidos.");
        }
    } catch (error) {
        console.error("❌ Erro ao buscar listagens:", error);
    }
}

// 🔹 Função para listar bancos de dados disponíveis
async function listDatabases(client) {
    try {
        const databasesList = await client.db().admin().listDatabases();
        console.log("\n📂 Bancos de Dados Disponíveis:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.error("❌ Erro ao listar bancos de dados:", error);
    }
}
