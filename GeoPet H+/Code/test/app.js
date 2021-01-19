var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var request = require('request');
 
var arreglo = [];

app.use(cors({
	origin: "http://localhost:80"
}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//RUTAS DE MI API

//get
app.get("/", function(req, res){ //cargar la página de promos
	res.sendFile(__dirname+"/movimiento.html");
});

app.get("/movimiento", function(req, res){
	res.json(arreglo);
});


//post
//app.post("/promos", function(req,res){
//	var obj = req.body;
//	console.log(obj);
//	arreglo.push(obj);
//	res.send("ok!");
//})

app.post("/movimiento", function(req,res){

	var obj = req.body;
	console.log(obj);
	arreglo[0]=obj;
	res.send("ok!");
});


app.listen(80, function(){
	console.log("Corriendo en puerto 80");
});
