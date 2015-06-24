'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

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
    }
});

module.exports = IntroContentView;