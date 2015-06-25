'use strict';

var $ = require('jquery');
var express = require('express');
var app = express();

var https = require('https');

module.exports = function(app){
    
    //login route
    app.post('/login', function (req, res) {
        console.log('received login request.');
        console.log('provider: %s', req.body.serviceProvider);
        console.log('credentials: %s', req.body.credentials);
        
        //verify consumer ID is what we expect
        
        //verify provider is either api.twitter.com or www.digits.com
        
        //send verification request to provider to ensure they validated successfully
        
        
        res.send('login response');
    });
};