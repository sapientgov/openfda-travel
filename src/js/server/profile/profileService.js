'use strict';

var express = require('express');
var app = express();

module.exports = function(app){
    
    //test route
    app.get('/profile', function (req, res) {
      res.send('Here is a profile');
    });
};