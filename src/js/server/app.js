'use strict';

var express = require('express');
var app = express();

//add body parser support
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

//allow cross-site CORS requests (from: http://enable-cors.org/server_expressjs.html)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//load external routes
require('./profile/profileService')(app);
require('./auth/authService')(app);

//set ip & port from OpenShift environment if available
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;

var server = app.listen(port, ipaddress, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('FDAanywhere app listening at http://%s:%s', host, port);

});