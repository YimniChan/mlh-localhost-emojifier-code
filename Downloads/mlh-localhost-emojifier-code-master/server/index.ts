const express = require('express');
const cors = require('cors');
const request = require('request');
const saveFace = require('./db');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.use(express.static(__dirname + "/../dist/"));
//const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect/';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect/';
const subscriptionKey = 'ed3ab614da804be1955bed0b600481ee';

const port = 3000;

app.post('/', (req, res) => {
  const { imageUrl } = req.body;

  const params = {
    'returnFaceAttributes': 'emotion'
  };

  const options = {
    url: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };
  // TODO: Send Request to Face API
  // TODO: Send Face API response to front-end
  // TODO: Save Face API response to database

  request.post(options, (error, response, body)=>{
    //request.post(options, (request, response, body)=>{
    console.log(body);
    res.setHeader('Content-Type', 'application/lson');
    res.send(body);
    if(response.statusCode=="200"){
      saveFace(imageUrl, JSON.stringify(body));
    }
  })
  
});

app.listen(port, () => console.log(`Emojifier back-end listening on port ${port}!`));
