
var request = require('request');
//var m = 0;
var fs = require('fs'),
    request = require('request');


//while(m < 200){
	//console.log("1");
	request('http://a037305e.ngrok.io/dashboard', function (error, response, body) {
		//console.log("2");
			//setTimeout(function(){
			//}, 5000); 	
		   if (error) throw new Error(error);

		    //Guardar texto en una variable
		   	var string = body;
		  
		  	var string2 = "Snapshot ";

			var x = string.indexOf("Snapshot");
			var y = string.lastIndexOf("saved");
			var res = string.substring(x,y);			
		   	var n = res.localeCompare(string2);

		   	console.log(x);
		   	console.log(y);
		   	console.log(res);
		   	console.log(string2);
		   	console.log(n);

		   if(n == 0){
		   
		   		var stream = function(){
		        	request('http://a037305e.ngrok.io/dashboard/images/foto.jpg').pipe(fs.createWriteStream('perro.jpg'));
		        	console.log("doneee");
		        	
		    	}
				stream();
		   }
	});
	//m++;
//}

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
	version: '2018-03-19',
	iam_apikey: 'w9W3gJwDfHVPPBlqqBbOl0mGehBGVnMYArZ5N3YnVbg0'
});

var images_file= fs.createReadStream('./perro.jpg');
var classifier_ids = ["DefaultCustomModel_1777506609"];
var threshold = 0.6;

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};

visualRecognition.classify(params, function(err, response) {
	if (err) { 
		console.log(err);
	} else {
		console.log(JSON.stringify(response, null, 2))
	}
});