'use strict';

var $ = require('jquery');

var _uid = null;
var _active = false;

var verifyLogin = function(loginResponse) {
    //transform login object
    var sendData = {
        serviceProvider: loginResponse.oauth_echo_headers['X-Auth-Service-Provider'],
        credentials: loginResponse.oauth_echo_headers['X-Verify-Credentials-Authorization']
    };
    
    //make call and return resulting promise object
    return $.ajax('http://localhost:8081/login', {
        dataType: "json",
        data: sendData,
        type: 'POST',
    });
};

var UserUtils = {
    
    isLoggedIn: function() {
        if(typeof Digits === 'undefined') {
            throw new Error('Digits is not initialized');
        }
        
        return _active;
    },
    
    login: function() {
        if(typeof Digits === 'undefined') {
            throw new Error('Digits is not initialized');
        }
        
        var deferred = $.Deferred();
        
        console.log('launching digits login process...');
        Digits.logIn().done(function(loginResponse) {
            console.log('received Digits authentication - logging in to FDAanywhere...');
            
            //TODO: send this to server
            verifyLogin(loginResponse).done(function(response) {
                console.log('successful login received: ', response);
                deferred.resolve(response);
            }).fail(function(e) {
                console.error('login unsuccessful!', e);
                deferred.reject({
                    type: 'verify',
                    message: 'login could not be verified'
                });
            });
            
        }).fail(function(reason) {
            console.log('Digits login failed.', reason);
            deferred.reject(reason);
        });
        
        return deferred.promise();
    },
    
    logout: function() {
        _uid = null;
        _active = false;
    }
};

module.exports = UserUtils;