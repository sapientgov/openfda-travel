'use strict';

var express = require('express');
var app = express();
var AuthProvider = require('./authProvider');

module.exports = function(app) {
    
    //login route
    app.post('/login', function (req, res) {
        console.log('received login request.');
        console.log('provider: %s', req.body.serviceProvider);
        console.log('credentials: %s', req.body.credentials);
        
        //send verification request to provider to ensure they validated successfully
        try {
            AuthProvider.verifyLoginWithDigits({
                providerUrl: req.body.serviceProvider, 
                authHeader: req.body.credentials,
                success: function(data) {

                    //send the JSON data back with successful result
                    res.json(data);
                },
                error: function(error) {
                    console.error('Unable to verify OAuth cerdentials: ', error);
                    res.sendStatus(400);
                }
            });
        } catch(e) {
            console.error('Error during OAuth verification: ', e);
            res.sendStatus(400);
        }
    });
};