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
        //hide the main content divs
        this.$('.row').hide();
        
        //render template into element
        this.$el.append(this.template());
        
        //setup login view
        this.loginView = new DigitsLoginView({
            el: this.$('.diglogin'),
            success: _.bind(this.onLoginSuccess, this)
        });
    },
    
    onLoginSuccess: function() {
        Backbone.history.navigate('q', {trigger: true});
    }
});

module.exports = IntroContentView;