'use strict';

var $ = require('jquery');
var User = require('../data/user');
var ProfileCollection = require('../data/profileCollection');

var _user = null;

var verifyLogin = function(loginResponse) {
    //transform login object
    var sendData = {
        serviceProvider: loginResponse.oauth_echo_headers['X-Auth-Service-Provider'],
        credentials: loginResponse.oauth_echo_headers['X-Verify-Credentials-Authorization']
    };
    
    //make call and return resulting promise object
    return $.ajax('/login', {
        data: sendData,
        type: 'POST'
    });
};

var UserUtils = {
    
    getCurrentUser: function() {
        return _user;
    },
    
    initUser: function() {
        //create user object
        _user = new User();
        
        //check for profiles
        var profiles = new ProfileCollection();
        profiles.fetch({
            success: function(collection, response, options) {
                console.log('initial fetch success!');
                //set the user object
                _user.set({
                    profiles: collection,
                    loggedIn: true
                });
            },
            error: function(collection, response, options) {
                console.log('initial fetch failed.');
                
                _user.set({
                    profiles: null,
                    loggedIn: false
                });
            }
        });
        
        return _user;
    },
    
    isLoggedIn: function() {
        return _user && _user.get('loggedIn');
    },
    
    login: function() {
        if(typeof Digits === 'undefined') {
            throw new Error('Digits is not initialized');
        }
        
        var deferred = $.Deferred();
        
        console.log('launching digits login process...');
        Digits.logIn().done(function(loginResponse) {
            console.log('received Digits authentication - logging in to FDAanywhere...');
            
            //verify the OAuth headers
            verifyLogin(loginResponse).done(function(response) {
                console.log('successful login received.');
                
                //set active flag
                if(_user) {
                    _user.set('loggedIn', true);
                } else {
                    _user = new User({
                        loggedIn: true
                    });
                }
                
                //resolve deferred
                deferred.resolve(response);
                
            }).fail(function(e) {
                console.error('login unsuccessful!', e);
                _user = null;
                deferred.reject({
                    type: 'verify',
                    message: 'login could not be verified'
                });
            });
            
        }).fail(function(reason) {
            console.log('Digits login failed.', reason);
            _user = null;
            deferred.reject(reason);
        });
        
        return deferred.promise();
    },
    
    logout: function() {
        if(_user) {
            _user.set('loggedIn', false);
        }
        
        //let the server know
        return $.ajax('/logout', {
            type: 'POST'
        });
    }
};

module.exports = UserUtils;