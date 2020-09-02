
exports.po = async  function (queryf, cliente) {
    try {
         const db = cliente.db("sholay-quotes");

         const col = db.collection("quotes");

         // Construct a document
         let personDocument = {
           "name": queryf.input3,
           "quote": queryf.input4,
         };

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         console.log("added");
         // Find one document
         // const myDoc = await col.findOne();
         // Print to the console
         // console.log(myDoc);
       } catch (err) {
        console.log(err.stack);
        }

        finally {
          console.log("finally post");
        }
  }
