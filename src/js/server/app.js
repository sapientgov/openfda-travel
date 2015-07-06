'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Set to true for local environment on 127.0.0.1
//Must be false for Docker containers
var dev=false;

//serve static files
app.use(express.static(__dirname + '/../public'));

//add support for parsers
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());

//set ip & port from OpenShift environment if available
if (process.env.OPENSHIFT_NODEJS_IP && process.env.OPENSHIFT_NODEJS_PORT) {
  var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
  var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

  var server = app.listen(port, ipaddress, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('FDAanywhere app listening at http://%s:%s', host, port);

  });
} else if(dev) {
  var ipaddress = "127.0.0.1";
  var port = 8080;

  var server = app.listen(port, ipaddress, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('FDAanywhere app listening at http://%s:%s', host, port);

  });
} else {
  var port = 8080;

  var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('FDAanywhere app listening at http://%s:%s', host, port);

  });
}


//external routes
require('./profile/profileManager').ProfileManager(app);
require('./auth/authService')(app);