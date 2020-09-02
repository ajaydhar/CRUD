//working shows put delete etc. 29-8-20 4 stubs 10:55
var http = require('http');
 var urlv = require('url');
 var dtpo = require('./src/mngposta.js');
 var dtde = require('./src/mngdeletea1.js');
 var dtge = require('./src/mngreada.js');
 var dtpu = require('./src/mngputa.js');


 const { MongoClient } = require("mongodb");

 const url = "mongodb+srv://Dharm:debra250@cluster0.t85cs.mongodb.net/<dbname>?retryWrites=true&w=majority";
 const client = new MongoClient(url, { useUnifiedTopology: true });
 async function ct(){
let r = await client.connect();
  if (r.err) { console.log('error in connecting');
  }
}
   ct();
 console.log("Connected correctly to server");

function getData(queryf){
  const gotd = "Will get data of " + queryf.input1;
  console.log(gotd);
  dtge.ge(queryf, client).catch(console.dir);
}

async function postData(queryf){

  const posted = "Will post " + queryf.input3 + " " + queryf.input4;

   // The database to use
   // const dbName = "sholay-quotes";
  dtpo.po(queryf, client).catch(console.dir); //async
  console.log("posted document");
}
function putData(queryf){
  const putd = "Will replace " + queryf.input5 + " by " + queryf.input2 + " " + queryf.input6;
  console.log(putd);
  dtpu.pu(queryf, client).catch(console.dir); //async
return;
}
 async function deleteData(queryf){
  const deleted = "Will delete data of " + queryf.input7;
  dtde.de(queryf, client).catch(console.dir); //async "console.dir" ajay

  console.log(deleted);
  return;
}


var postHTML =
'<html><head><title>Post Eg</title></head>' +
'<body>' +
'<form method="get">' +
'Quote 1: <input name="input1"><br>' +
'<input type="submit" value="Get">' +
'</form>' +
'<form method="post">' +
'Name : <input name="input3"><br>' +
'Quote: <input name="input4"><br>' +
'<input type="submit" value="Post">' +
'</form>' +
'<form method="put">' +
'Old quote : <input name="input5"><br>' +
'New Name: <input name="input2"><br>' +
'New quote : <input name="input6"><br>' +
'<input type="submit" value="Put">' +
'</form>' +
'<form method="delete">' +
'Quote to delete: <input name="input7"><br>' +
'<input type="submit" value="Delete">' +
'</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  const { headers, method, url } = req;//ajay

  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  // var bodys = "";

// var query = url.parse(req.url,true).query;//ajay
res.writeHead(200, {'content-type': 'text/html'});
const responseBody = { headers, method, url, body };
// const responses=JSON.stringify(responseBody);
// res.write("body is "+body);
// res.write(responses);
if (method=="GET")
{
  // console.log("query was ");
  // console.log(query);
  var query = urlv.parse(req.url,true).query;//ajay

  // console.log("query becomes ");
  // console.log(query);
  // var name = query.input5 ? query.input5 : "World";

  if (query.input1){
    console.log("Got data");
    getData(query);
  }
  if (query.input5){
    console.log("Put data");
    putData(query);
  }
  if (query.input7){
    console.log("Deleted data");
    deleteData(query);
  }
}

req.on('end', function () {

  if (method=="POST"){
   console.log("posting data");
   body=body.split('+').join(' ');

   // console.log("body is ");
   // console.log(body);//ajay

  var params = body.split("&");
// Create the destination object.
  var obj = {};
// iterate the splitted String and assign the key and values into the obj.
    for (var i in params) {
      var keys = params[i].split("=");
      obj[keys[0]] = keys[1];
    }

    // console.log(obj); // Object {sendNo
    console.log("obj.input3 is "); // Object {sendNo
    console.log(obj.input3); // Object {sendNo
    console.log('POSTed: ' + body);
    postData(obj);
  }
    res.end(postHTML);
  });

}).listen(8090);
async function closed(){ await client.close();}
closed();
