'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var currentResult;
var currentCount;

var DrugSearchResultsView = Backbone.View.extend({
    tagName: 'li',
    
    attributes: {
        'class': 'result-item'
    },
    
    events: {
        'click': 'handleSelect',
		'mouseover': 'mouseoverTest'
    },
    
    initialize: function(options) {
        this.result = options.result;
        this.callback = options.callback;
    },
	
	mouseoverTest: function() {
		currentResult = this.result.term;
		currentCount = this.result.count;
		this.callback(this.result.term, this.result.count);
	},
    
    render: function() {
        var self = this;
        
        //check that we have results to show
        if(!this.result) {
            throw new Error('No result to render');
        }
        
        //add the term to the item
        this.$el.text(this.result.term);
        
        //enable chaining
        return this;
    },
    
    handleSelect: function() {
        console.log('triggering callback, term=%s', this.result.term);
        this.callback(this.result.term, this.result.count);
    }
});

module.exports = DrugSearchResultsView;