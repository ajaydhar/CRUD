
exports.de = async  function (queryc, clientc) {
   try {

     const dbe = clientc.db("sholay-quotes");
     const coll = dbe.collection("quotes");

     // create a query for a quote to delete
     const doc = {
       "quote":  queryc.input7
     };

     const deleteResult = await coll.deleteOne(doc);
     console.log("deleted: ");
     console.dir(deleteResult.deletedCount); //dir
   } finally {
     console.log("finally deleted");
   }
 }
