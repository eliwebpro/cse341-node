const { MongoClient } = require('mongodb');
require('dotenv').config(); // Carregar variáveis do .env

async function main() {
    const uri = process.env.MONGO_URI; // Pegando a string de conexão do .env
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Conectado ao MongoDB!");

        // Criando uma nova listagem na coleção "listingsAndReviews"
        await createMultipleListings(client, [
            {
                name: "Lovely Loft 2",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            },
            {
                name: "Spacious flat",
                summary: "A spacious flat in the heart of London",
                bedrooms: 2,
                bathrooms: 2
            }]
        );

        // Listar todos os bancos de dados
        await listDatabases(client);

    } catch (e) {
        console.error("❌ Erro na conexão:", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createMultipleListings(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListing);
    console.log(`✅ ${result.insertedCount} registros criados com sucesso!`);
    console.log(result.insertedIds);
}

// 🔹 Função para criar uma nova listagem no banco de dados
async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`✅ Novo registro criado com o ID: ${result.insertedId}`);
}

// 🔹 Função para listar todos os bancos de dados
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("📂 Bancos de Dados:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
