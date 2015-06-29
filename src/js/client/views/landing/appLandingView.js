'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var DigitsLoginView = require('../auth/digitsLoginView');

var IntroContentView = Backbone.View.extend({
    el: '#container-main',
    
    initialize: function() {
        this.template = _.template($('#landing-content-template').html());
    },
    
    render: function() {
        
        //render template into element
        this.$('#full-width-container').append(this.template());
        
        //setup login view
        this.loginView = new DigitsLoginView({
            el: this.$('.diglogin'),
            success: _.bind(this.onLoginSuccess, this)
        });
    },
    
    onLoginSuccess: function() {
        console.log('login complete! Forwarding onward.');
        Backbone.history.navigate('q', {trigger: true});
    }
});

module.exports = IntroContentView;