'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DrugSearchResultsView = require('./drugSearchResultsView');

var DrugSearchPageView = Backbone.View.extend({
    
    events: {
        'click .query-labelIndex': 'searchSubmit',
        'keydown input[name="brand-name"]': 'checkEnter'
    },
    
    render: function() {
        
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate());
    },
    
    searchSubmit: function() {
        var self = this;
        var q = this.$('input[name="brand-name"]').val();
        console.log('searching for %s', q);
        FdaService.findDrugsByBrand(q).done(function(data) {
            
            self.resultsView = new DrugSearchResultsView({resultsList: data.results});
            self.resultsView.render();
            self.$('#results').html(self.resultsView.el);
            
        }).fail(function() {
            console.error('call failed!');
        });
    },
    
    checkEnter: function(event) {
        if(event.which === 13 || event.keyCode === 13){
            event.preventDefault();
            this.searchSubmit();
        }
    }
});

module.exports = DrugSearchPageView;