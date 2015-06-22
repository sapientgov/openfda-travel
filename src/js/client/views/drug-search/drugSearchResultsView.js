'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var DrugSearchResultsView = Backbone.View.extend({
    initialize: function(options) {
        this.resultsList = options.resultsList;
        this.template = _.template($('#search-result-template').html());
    },
    
    render: function() {
        var self = this;
        
        //check that we have results to show
        if(!this.resultsList) {
            throw new Error('No results to render');
        }
        
        _.each(this.resultsList, function(result) {
            if(result.term) {
                self.$el.append(self.template(result));
            }
        });
    }
});

module.exports = DrugSearchResultsView;