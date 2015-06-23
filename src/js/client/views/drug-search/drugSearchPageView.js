'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DrugSearchResultsView = require('./drugSearchResultsView');

var DrugSearchPageView = Backbone.View.extend({
    initialize: function(options) {
        
        //default search type
        this.searchType = 'BRAND';
        
        //set the search target
        //default is LABEL - other supported value is RECALL
        //pass this into the constructor to set
        this.searchTarget = (options && options.searchTarget) || 'LABEL';
    },
    
    events: {
        'click .query-labelIndex': 'searchSubmit',
        'keyup input[name="brand-name"]': 'checkKey',
        'blur input[name="brand-name"]': 'clearResultsOnDelay',
        'focus input[name="brand-name"]': 'checkKey',
        'click button.fda-search': 'clickSearchType'
    },
    
    render: function() {
        
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate());
        
        //enable chaining
        return this;
    },
    
    updateResults: function(q) {
        console.log('update results');
        //check the search type and react accordingly
        switch(this.searchType) {
            case 'BRAND':
                this.searchByBrand(q);
                break;
            case 'ALL':
                alert('Cannot search by this yet');
                break;
            case 'GENERIC':
                alert('Cannot search by this yet');
                break;
            case 'INGREDIENT':
                alert('Cannot search by this yet');
                break;
            default:
                throw new Error('Unexpected search type!');
        }
    },
    
    chooseResult: function(term) {
        console.log('triggering search for %s', term);
        this.trigger('drug-search-complete', {
            type: this.searchType,
            q: term
        });
    },
    
    searchByBrand: function(q) {
        var self = this;
        console.log('count results from data %s for query %s', this.searchTarget, q);
        
        //perform the search against the correct dataset
        var apiPromise;
        switch(this.searchTarget) {
            case 'LABEL':
                apiPromise = FdaService.findDrugsByBrand(q);
                break;
            case 'RECALL':
                apiPromise = FdaService.findRecallsByBrand(q);
                break;
            default:
                throw new Error('Unsupported search target');
        }
        
        //when the promise is resolved update the search results
        apiPromise.done(function(data) {
            
            //only update results if the field value is the same as what was requested
            if(self.$('input[name="brand-name"]').val() === q) {
                self.$('#count-results-list').empty();
                _.each(data.results, function(item) {
                    var view = new DrugSearchResultsView({
                        result: item, 
                        callback: _.bind(self.chooseResult, self)
                    });
                    self.$('#count-results-list').append(view.render().el);    
                });
            }
            
        }).fail(function() {
            console.error('call failed!');
            //if the input value is the same as what we're looking for, clear the results
            if(self.$('input[name="brand-name"]').val() === q) {
                self.$('#count-results-list').empty();
            }
        });
    },
    
    /**
     * Clears the result after a short delay. This should only be used 
     * onblur to allow the click handler to fire before the element is cleared
     */
    clearResultsOnDelay: function() {
        var self = this;
       _.delay(function() {
           self.$('#count-results-list').empty();
       }, 100);
    },
    
    checkKey: function(event) {
        if(event && (event.which === 13 || event.keyCode === 13)) {
            //do nothing on enter key
            event.preventDefault();
        } else {
            var val = this.$('input[name="brand-name"]').val();
            if(val && val.length > 2) {
                this.updateResults(val);
            }
        }
    },
    
    clickSearchType: function(e) {
        var $clicked = $(e.target);
        if($clicked.hasClass('search-all')) {
            this.changeSearchType('ALL', 'All', 'search-all');
        } else if($clicked.hasClass('search-brand')) {
            this.changeSearchType('BRAND', 'Brand Name', 'search-brand');
        } else if($clicked.hasClass('search-generic')) {
            this.changeSearchType('GENERIC', 'Generic', 'search-generic');
        } else if($clicked.hasClass('search-ingredient')) {
            this.changeSearchType('INGREDIENT', 'Active Ingredient', 'search-ingredient');
        }
    },
    
    changeSearchType: function(newType, label, activeClass) {
        this.searchType = newType;
        console.log('active class: %s', activeClass);
        this.$('.btn-group').removeClass('active');
        this.$('.' + activeClass).parent().addClass('active');
        this.$('input[name="brand-name"]').attr('placeholder', label).val('');
    }
});

module.exports = DrugSearchPageView;