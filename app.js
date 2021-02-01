var express = require('express');
var app = express();
 
var server = require('http').createServer(app);
 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/sim.html');
});

// app.use('/client', express.static(__dirname + '/client'));

server.listen(process.env.PORT || 5000);

console.log("Server started.");

