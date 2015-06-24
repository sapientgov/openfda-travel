'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var GOOG_CLIENT_ID = '911719545649-998dntke34uvnet6khmtivk5i58g0c2d.apps.googleusercontent.com';
var _instance;
var auth2;

var User = Backbone.Model.extend({
    initialize: function() {
        //initialize the client
        auth2 = gapi.auth2.init({
            client_id: GOOG_CLIENT_ID
        });
    }
});

var SingletonWrapper = {
    createInstance: function() {
        _instance = new User();
        return _instance;
    },
    
    getInstance: function() {
        return _instance;
    }
};

module.exports = SingletonWrapper;