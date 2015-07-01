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
    	$('[data-toggle="tooltip"]').tooltip();
        //just render template into element
        this.$el.html(this.template());
		$('aside').removeClass('pushedDown');
    }
});

module.exports = InitialQuestionsView;