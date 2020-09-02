// const { MongoClient } = require("mongodb");
//
// // Replace the following with your Atlas connection string
// // const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
// const url = "mongodb+srv://Dharm:debra250@cluster0.t85cs.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(url, { useUnifiedTopology: true });
//
//  // The database to use
//  const dbName = "sholay-quotes";

exports.ge = async  function (queryf, clientf) {
  try {

    const database = clientf.db("sholay-quotes");
    const collection = database.collection("quotes");

    // query for quote
    const queryg = { "quote": queryf.input1 };   //runtime: { $lt: 15 }

    const options = {
      // sort returned documents in ascending order by title (A->Z)
      // sort: { name: 1 },
    // Include only the `name` and `quote` fields in each returned document
      projection: { _id: 0, name: 1, quote: 1 },
    };

    const cursor = collection.find(queryg, options);

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }

    await cursor.forEach(console.dir);
  } finally {
    console.log("Got document");
  }
}
