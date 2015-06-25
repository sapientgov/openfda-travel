'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//external routes
require('./profile/profileService')(app);
require('./profile/profileManager').ProfileManager(app);

//set ip & port from OpenShift environment if available
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;

var server = app.listen(port, ipaddress, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});