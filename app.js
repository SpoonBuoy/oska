const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
    const result = await client.db("oska").collection("recent_tweets").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function findListing(client, inst){
    const result = await client.db("oska").collection("recent_tweets").findOne({institution : "Womens College"});
    return result;
}
async function db(inst){
    const uri = "mongodb+srv://admin:oska@cluster0.8wfkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try{
        await client.connect();
       // await listDatabases(client);
       // await createListing(client, test1);
       const res = await findListing(client, inst);
       return res;
    } catch(err){
        console.error(err);
    } finally{
        client.close();
    }
}
module.exports = db;
//main().catch(console.error);
