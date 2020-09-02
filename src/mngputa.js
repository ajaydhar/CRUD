
exports.pu = async  function (queryc, clientc) {
   try {

     const database = clientc.db("sholay-quotes");
     const collection = database.collection("quotes");

     // create a query for a quote to update
     const query = {

       "quote": queryc.input5,
     };
     const options = {
       // create a document if no documents match the query
       upsert: true,
     };
     // create a new document that will be used to replace the existing document
     const replacement = {
       "name": queryc.input2,
       "quote": queryc.input6,
     };

     const result = await collection.replaceOne(query, replacement, options);

     if (result.modifiedCount === 0 && result.upsertedCount === 0) {
       console.log("No changes made to the collection.");
     } else {
       if (result.matchedCount === 1) {
         console.log("Matched " + result.matchedCount + " documents.");
       }
       if (result.modifiedCount === 1) {
         console.log("Updated one document.");
       }
       if (result.upsertedCount === 1) {
         console.log(
           "Inserted one new document with an _id of " + result.upsertedId._id
         );
       }
     }
   } finally {
     console.log("could put data");
   }
 }
