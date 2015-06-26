'use strict';

var $ = require('jquery');

var _active = false;

var verifyLogin = function(loginResponse) {
    //transform login object
    var sendData = {
        serviceProvider: loginResponse.oauth_echo_headers['X-Auth-Service-Provider'],
        credentials: loginResponse.oauth_echo_headers['X-Verify-Credentials-Authorization']
    };
    
    //make call and return resulting promise object
    return $.ajax('http://localhost:8080/login', {
        data: sendData,
        type: 'POST'
    });
};

var UserUtils = {
    
    isLoggedIn: function() {
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
                console.log('successful login received.');
                
                //set active flag
                _active = true;
                
                //resolve deferred
                deferred.resolve(response);
                
            }).fail(function(e) {
                console.error('login unsuccessful!', e);
                _active = false;
                deferred.reject({
                    type: 'verify',
                    message: 'login could not be verified'
                });
            });
            
        }).fail(function(reason) {
            console.log('Digits login failed.', reason);
            _active = false;
            deferred.reject(reason);
        });
        
        return deferred.promise();
    },
    
    logout: function() {
        _active = false;
    }
};

module.exports = UserUtils;