'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var IntroContentView = Backbone.View.extend({
    el: '#full-width-container',
    
    initialize: function() {
        this.template = _.template($('#dashboard-intro-template').html());
    },
    
    render: function() {
        
        //just render template into element
        this.$el.html(this.template());
    }
});

module.exports = IntroContentView;