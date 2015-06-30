'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var InitialQuestionsView = Backbone.View.extend({
    el: '#primary-content',
    
    initialize: function() {
        this.template = _.template($('#dashboard-template').html());
    },
    
    render: function() {
    	$('aside').removeClass('tamped');
        //just render template into element
        this.$el.html(this.template());
    }
});

module.exports = InitialQuestionsView;