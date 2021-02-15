var express = require('express');
var app = express();
 
var server = require('http').createServer(app);

var path = require('path');


var lalolib = require('./client/lalolib.js');
var util = require('./client/util.js');

app.use(express.static(path.join(__dirname, 'client')));

app.use('/', lalolib);
app.use('/', util);

app.get('/', function(req, res) {
    // res.sendFile(__dirname + '/client/1L.png');
    // res.sendFile(__dirname + '/client/2L.png');
    // res.sendFile(__dirname + '/client/3L.png');
    // res.sendFile(__dirname + '/client/4L.png');

    // res.sendFile(__dirname + '/client/1R.png');
    // res.sendFile(__dirname + '/client/2R.png');
    // res.sendFile(__dirname + '/client/3R.png');
    // res.sendFile(__dirname + '/client/4R.png');

    res.sendFile(__dirname + '/client/sim.html');
});

// app.use('/client', express.static(__dirname + '/client'));

server.listen(process.env.PORT || 5000);

console.log("Server started.");

