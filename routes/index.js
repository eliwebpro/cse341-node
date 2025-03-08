const mongodb = require('./database');

// 📂 **Listar Coleções**
async function listCollections() {
    const db = mongodb.getDb();
    const collections = await db.listCollections().toArray();
    console.log("\n📂 Coleções disponíveis:");
    collections.forEach(col => console.log(` - ${col.name}`));
}

// 📌 **CREATE**
async function insertOneListing(newListing) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").insertOne(newListing);
    console.log(`✅ Novo documento criado com o ID: ${result.insertedId}`);
}

async function insertManyListings(newListings) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").insertMany(newListings);
    console.log(`✅ ${result.insertedCount} documentos foram criados!`);
}

// 📌 **READ**
async function findOneListingByName(name) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").findOne({ name: name });
    if (result) {
        console.log(`\n📄 Encontrado: ${name}`);
        console.log(result);
    } else {
        console.log(`❌ Nenhum documento encontrado com o nome: "${name}"`);
    }
}

async function findListingsWithCriteria({ minimumBedrooms = 0 }) {
    const db = mongodb.getDb();
    const cursor = db.collection("listingsAndReviews")
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

// 📌 **UPDATE**
async function updateListingByName(name, updatedData) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").updateOne(
        { name: name },
        { $set: updatedData }
    );
    console.log(`${result.matchedCount} documento(s) encontrados.`);
    console.log(`${result.modifiedCount} documento(s) foram atualizados.`);
}

async function updateManyListings(filter, updatedData) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").updateMany(filter, { $set: updatedData });
    console.log(`${result.matchedCount} documentos encontrados.`);
    console.log(`${result.modifiedCount} documentos foram atualizados.`);
}

// 📌 **DELETE**
async function deleteOneListing(name) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").deleteOne({ name: name });
    if (result.deletedCount === 1) {
        console.log(`✅ O documento "${name}" foi excluído.`);
    } else {
        console.log(`❌ Nenhum documento encontrado para exclusão: "${name}".`);
    }
}

async function deleteManyListings(filter) {
    const db = mongodb.getDb();
    const result = await db.collection("listingsAndReviews").deleteMany(filter);
    console.log(`✅ ${result.deletedCount} documentos foram excluídos.`);
}

module.exports = {
    listCollections,
    insertOneListing,
    insertManyListings,
    findOneListingByName,
    findListingsWithCriteria,
    updateListingByName,
    updateManyListings,
    deleteOneListing,
    deleteManyListings
};
