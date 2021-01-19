var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var request = require('request');

app.use(cors({
	origin: "http://localhost:3000"
}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

request('https://bridge.buddyweb.fr/api/shelterlocations/shelterinfo?=contact', function (error, response, body) {
  //console.log('Status:', response.statusCode);
  //console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});



app.listen(3000, function(){
	console.log("Corriendo en puerto 3000");
});



