'use strict';

var $ = require('jquery');

var _uid = null;
var _active = false;

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
        
        Digits.logIn().done(function(loginResponse) {
            console.log('login success!', loginResponse);
            
            //TODO: send this to server
            
            deferred.resolve();
            
        }).fail(function(reason) {
            console.log('login error', reason);
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