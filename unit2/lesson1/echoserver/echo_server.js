var express = require('express');

var app = express();

app.get('/', function(request, response) {
  response.json({
        name: 'Kim Gordon',
        instrument: 'Bass'
    });
});

app.get('/headers', function(request, response) {
  var json = {};
  // shallow copy key/vaules from header object to json obj
  for(var prop in request.headers) {
    if(request.headers.hasOwnProperty(prop)) {
      json[prop] = request.headers[prop];
    }
  }

  response.json(json);
});

app.get('/headers/:header_name', function(request, response) {
  var key = request.params.header_name,
    value = 'Property "'+key+'" not found on header';

  if(request.headers.hasOwnProperty(key)) {
    value = request.headers[key];
  }

  response.send(value);
});

app.get('/version', function(request, response) {
  response.send(request.httpVersion);
});

// app.listen(8080);

exports.EchoApp = app;