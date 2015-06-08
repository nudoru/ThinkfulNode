var express = require('express');

var app = express();

app.get('/', function(request, response) {
  response.send('Hello world!');
});

app.get('/:firstname/:lastname', function(request, response) {
  var first = request.params.firstname;
  var last = request.params.lastname;
  response.send(['Hello',first,last].join(' '));
});

app.get('/jedi/:firstname/:lastname', function(request, response) {
  var first = request.params.firstname;
  var last = request.params.lastname;
  var jediname = last.substr(0,3)+first.substr(0,2);
  response.send(['Hello',jediname].join(' '));
});

app.listen(8080);

