
const {MongoClient} = require('mongodb');



async function main() {
  const uri = "mongodb+srv://ca-fire-tracker-dev_3051:HrRaQDrw2FkTn8g9@cluster0.q74v1.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();

    await listDatabases(client);

  }
  catch (err) {
    console.log(err);
  }
  finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases: ');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));

}

// client.connect(err => {
//   if (err) console.log(err);
//   const collection = client.db("sample_airbnb").collection("listingsAndReviews");
//   console.log(collection)
//   // perform actions on the collection object
//   client.close();
// });

// module.exports = client;