'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var IntroContentView = Backbone.View.extend({
    el: '#intro',
    
    initialize: function() {
        this.template = _.template($('#dashboard-intro-template').html());
    },
    
    render: function() {
        console.log('introductionContentView');
        //change section background
        $('body').css('background-image',"url(../img/home.jpg)");
        //just render template into element
        this.$el.html(this.template());
    },
    
    remove: function() {
        this.stopListening();
        this.$el.empty(); //leave the main intro node for later
    }
});

module.exports = IntroContentView;