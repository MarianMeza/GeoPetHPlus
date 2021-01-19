const https = require('https');
const request = require('request');
const express = require('express');
const app = express();
var nodemailer = require('nodemailer');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors({
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Hacer request del API de los shelters cercanos a ti
request('https://bridge.buddyweb.fr/api/shelterlocations/shelterinfo', function (error, response, body) {
    if (error) throw new Error(error);

    //Guardar texto en una variable
    var string = body;

    //Convertir a JSON
    var shelter_info = JSON.parse(string);

    //Variables a utilizar
    var size = shelter_info.length;
    var arrayContact = [];
    var i = 0;

    //Guardar todos los correos en un arreglo
    for (i = 0; i < size; i++) {
      arrayContact[i] = shelter_info[i].contact;
      //console.log(arrayContact[i]);
    }

    //console.log(arrayContact.join());

    //Usuario que mandará el correo
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sfhackathon982@gmail.com',
        pass: 'Hacks123456!'
      }
    });

    //Correo a enviar
    var mailOptions = {
      from: 'sfhackathon982@gmail.com',
      to: arrayContact.join(),
      subject: 'My dog is missing',
      text: 'Hi, my dog went out of my home secure area, please let me know if you see it. Attached is a photo of my pet. Thank you!',
      attachments: [{
          filename: 'dog.jpeg',
          path: 'C:/Users/Adm/Desktop/test/dog.jpg'
      }]
    };

    var mailOptions2 = {
      from: 'sfhackathon982@gmail.com',
      to: "oscarmontes3112@gmail.com",
      subject: 'Alert: dog',
      text: "dog"
    };

    //Enviar correo
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    transporter.sendMail(mailOptions2, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent2: ' + info.response);
      }
    });
});




