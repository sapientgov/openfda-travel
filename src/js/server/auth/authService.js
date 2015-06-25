'use strict';

var express = require('express');
var app = express();

module.exports = function(app){
    
    //login route
    app.post('/login', function (req, res) {
      res.send('login response');
    });
};