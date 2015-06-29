'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var UserUtils = require('../../utils/userUtils');

var MainHeaderView = Backbone.View.extend({
    el: '#app-header',
    
    initialize: function() {
        
        //setup model events
        this.listenTo(this.model, 'change:loggedIn', this.loginStateChange);
    },
    
    render: function() {
        
        //setup the login view
        
    },
    
    loginStateChange: function(model, value, options) {
        if(value) {
            //user is now logged in
            this.$('.login-link').text('Logout');
        } else {
            //user is now logged out
            this.$('.login-link').text('Login');
        }
    }
});

module.exports = MainHeaderView;