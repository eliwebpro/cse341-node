const { MongoClient } = require('mongodb');
require('dotenv').config(); // Carregar variáveis do .env

async function main() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("❌ Erro: MONGO_URI não definido no .env");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Conectado ao MongoDB!");

        // Listar coleções
        await listCollections(client, "sample_airbnb");

        // 📌 CREATE
        await insertOneListing(client, "sample_airbnb", "listingsAndReviews", {
            name: "Cozy Cottage",
            bedrooms: 3,
            bathrooms: 1.5,
            city: "São Paulo"
        });

        await insertManyListings(client, "sample_airbnb", "listingsAndReviews", [
            { name: "Beach House", bedrooms: 4, bathrooms: 2, city: "Rio de Janeiro" },
            { name: "Mountain Cabin", bedrooms: 2, bathrooms: 1, city: "Gramado" }
        ]);

        // 📌 READ
        await findOneListingByName(client, "sample_airbnb", "listingsAndReviews", "Cozy Cottage");
        await findListingsWithCriteria(client, "sample_airbnb", "listingsAndReviews", { minimumBedrooms: 2 });

        // 📌 UPDATE
        await updateListingByName(client, "sample_airbnb", "listingsAndReviews", "Cozy Cottage", { bedrooms: 4, bathrooms: 2 });
        await updateManyListings(client, "sample_airbnb", "listingsAndReviews", { city: "Rio de Janeiro" }, { bathrooms: 3 });

        // 📌 DELETE
        await deleteOneListing(client, "sample_airbnb", "listingsAndReviews", "Mountain Cabin");
        await deleteManyListings(client, "sample_airbnb", "listingsAndReviews", { city: "São Paulo" });

    } catch (e) {
        console.error("❌ Erro na conexão:", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

/// 📂 **Listar Coleções**
async function listCollections(client, dbName) {
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    console.log(`\n📂 Banco de Dados: ${dbName}`);
    console.log("📁 Coleções disponíveis:");
    collections.forEach(col => console.log(` - ${col.name}`));
}

/// 📌 **CREATE**
async function insertOneListing(client, dbName, collectionName, newListing) {
    const result = await client.db(dbName).collection(collectionName).insertOne(newListing);
    console.log(`✅ Novo documento criado com o ID: ${result.insertedId}`);
}

async function insertManyListings(client, dbName, collectionName, newListings) {
    const result = await client.db(dbName).collection(collectionName).insertMany(newListings);
    console.log(`✅ ${result.insertedCount} documentos foram criados!`);
}

/// 📌 **READ**
async function findOneListingByName(client, dbName, collectionName, name) {
    const result = await client.db(dbName).collection(collectionName).findOne({ name: name });
    if (result) {
        console.log(`\n📄 Encontrado: ${name}`);
        console.log(result);
    } else {
        console.log(`❌ Nenhum documento encontrado com o nome: "${name}"`);
    }
}

async function findListingsWithCriteria(client, dbName, collectionName, { minimumBedrooms = 0 }) {
    const cursor = client.db(dbName).collection(collectionName)
        .find({ bedrooms: { $gte: minimumBedrooms } })
        .limit(5);

    const results = await cursor.toArray();
    if (results.length > 0) {
        console.log("\n🏠 Listagens encontradas:");
        results.forEach((result, i) => {
            console.log(`${i + 1}. 🏡 ${result.name || "Sem Nome"} - 🛏️ Quartos: ${result.bedrooms}`);
        });
    } else {
        console.log("⚠️ Nenhuma listagem encontrada.");
    }
}

/// 📌 **UPDATE**
async function updateListingByName(client, dbName, collectionName, name, updatedData) {
    const result = await client.db(dbName).collection(collectionName).updateOne(
        { name: name },
        { $set: updatedData }
    );

    console.log(`${result.matchedCount} documento(s) encontrados.`);
    console.log(`${result.modifiedCount} documento(s) foram atualizados.`);
}

async function updateManyListings(client, dbName, collectionName, filter, updatedData) {
    const result = await client.db(dbName).collection(collectionName).updateMany(filter, { $set: updatedData });
    console.log(`${result.matchedCount} documentos encontrados.`);
    console.log(`${result.modifiedCount} documentos foram atualizados.`);
}

/// 📌 **DELETE**
async function deleteOneListing(client, dbName, collectionName, name) {
    const result = await client.db(dbName).collection(collectionName).deleteOne({ name: name });
    if (result.deletedCount === 1) {
        console.log(`✅ O documento "${name}" foi excluído.`);
    } else {
        console.log(`❌ Nenhum documento encontrado para exclusão: "${name}".`);
    }
}

async function deleteManyListings(client, dbName, collectionName, filter) {
    const result = await client.db(dbName).collection(collectionName).deleteMany(filter);
    console.log(`✅ ${result.deletedCount} documentos foram excluídos.`);
}
