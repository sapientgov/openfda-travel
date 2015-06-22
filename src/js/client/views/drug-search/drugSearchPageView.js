'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DrugSearchResultsView = require('./drugSearchResultsView');

var DrugSearchPageView = Backbone.View.extend({
    el: '#primary-content',
    
    initialize: function() {
        this.searchType = 'BRAND';
    },
    
    events: {
        'click .query-labelIndex': 'searchSubmit',
        'keydown input[name="brand-name"]': 'checkEnter',
        'click button.fda-search': 'clickSearchType'
    },
    
    render: function() {
        
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate());
    },
    
    searchSubmit: function(e) {
        
        var q = this.$('input[name="brand-name"]').val();
        console.log('searching for %s', q);
        
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
    
    searchByBrand: function(q) {
        var self = this;
        
        FdaService.findDrugsByBrand(q).done(function(data) {
            
            self.resultsView = new DrugSearchResultsView({resultsList: data.results});
            self.resultsView.render();
            self.$('#info-list-panel').html(self.resultsView.el);
            
        }).fail(function() {
            console.error('call failed!');
        });
    },
    
    checkEnter: function(event) {
        if(event.which === 13 || event.keyCode === 13){
            event.preventDefault();
            this.searchSubmit();
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