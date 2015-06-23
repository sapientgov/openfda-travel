'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var DrugSearchResultsView = Backbone.View.extend({
    tagName: 'li',
    
    attributes: {
        'class': 'result-item'
    },
    
    events: {
        'click': 'handleSelect'
    },
    
    initialize: function(options) {
        this.result = options.result;
        this.callback = options.callback;
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
        //trigger an event on the parent <ul> node
        console.log('triggering callback, term=%s', this.result.term);
        this.callback(this.result.term);
    }
});

module.exports = DrugSearchResultsView;