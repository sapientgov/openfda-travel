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
                success: function(loginToken) {

                    //set login token in cookie
                    res.cookie('fdaaw-token', loginToken, {
                        httpOnly: true,
                        expires: 0
                    });
                    
                    //send back success response
                    res.sendStatus(200);
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
    
    app.post('/logout', function(req, res) {
        console.log('received logout request.');
        
        //read cookie
        var loginToken = req.cookies['fdaaw-token'];
        console.log('logout for token %s', loginToken);
        AuthProvider.logout(loginToken);
    });
};