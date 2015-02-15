var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var path = require('path');

var app = express();

// Sets us up to read body content from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Adds request logging
app.use(morgan('dev'));

// Sets up the server to serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// For all requests we do not explicitly handle (*), return index.html
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


// Listen on port 1337
var port = 1337;
app.listen(port);
console.log('Server up and running on port ' + port);