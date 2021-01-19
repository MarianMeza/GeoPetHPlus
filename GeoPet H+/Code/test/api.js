var parallel = require('run-parallel')
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var request = require('request');
var fs = require('fs'),
    request = require('request');
var arreglo = [];
var salir = true;

 
parallel([
  function (callback) {
    setTimeout(function () {
     

console.log("entro al parallel 1");
app.use(cors({
	origin: "http://localhost:3000"
}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//RUTAS DE MI API

//get
app.get("/", function(req, res){ //cargar la página de promos
	res.sendFile(__dirname+"/promos.html");
});

app.get("/promos", function(req, res){
	res.json(arreglo);
});

//post
//app.post("/promos", function(req,res){
//	var obj = req.body;
//	console.log(obj);
//	arreglo.push(obj);
//	res.send("ok!");
//})

app.post("/promos", function(req,res){

	var obj = req.body;
	console.log(obj);
	arreglo[0]=obj;
	res.send("ok!");
});

app.listen(80, function(){
	console.log("Corriendo en puerto 80");
});

 callback(null, 'one')
    }, 200)


  },
  function (callback) {
    setTimeout(function () {

console.log("entro al parallel 2");
while(salir == true){
	console.log("adentro del while");
	request('http://69b3cc3e.ngrok.io/dashboard/', function (error, response, body) {
		console.log("adentro del request");
		   if (error) throw new Error(error);

		    //Guardar texto en una variable
		   	var string = body;
		  	var string2 = "Snapshot ";

			var x = string.indexOf("Snapshot");
			var y = string.lastIndexOf("saved");
			var res = string.substring(x,y);
			
		   	var n = res.localeCompare(string2);

		   if(n == 0){
		   		var stream = function(){
		        	request('http://69b3cc3e.ngrok.io/dashboard/images/foto.jpg').pipe(fs.createWriteStream('perro.jpg'));
		        	console.log("doneee");
		        	salir = false;
		    	}
				stream();
		   }
	});
}

     callback(null, 'two')
    }, 100)


  }
],
// optional callback
function (err, results) {
  // the results array will equal ['one','two'] even though
  // the second function had a shorter timeout.
})





