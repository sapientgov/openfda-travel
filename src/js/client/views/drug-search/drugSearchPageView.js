'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DataUtils = require('../../utils/dataUtils');
var DrugSearchResultsView = require('./drugSearchResultsView');
var DrugProductResultsView = require('./drugProductResultsView');
var DrugApprovedInfoView = require('../approved/drugApprovedInfoView');
var selection = null;
var count = null;

var DrugSearchPageView = Backbone.View.extend({
    initialize: function(options) {
        
        //default search type
        this.searchType = 'BRAND';
        
        //set the search target - used for the title
        //default is LABEL - other supported values are RECALL or APPROVED
        //pass this into the constructor to set
        this.searchTarget = (options && options.searchTarget) || 'LABEL';
    },
    
    events: {
        'click .query-labelIndex': 'searchSubmit',
		'keyup input[name="brand-name"]': 'updateAutocomplete',
        'keydown input[name="brand-name"]': 'checkEnter',
        'blur input[name="brand-name"]': 'clearResultsOnDelay',
        'focus input[name="brand-name"]': 'updateAutocomplete',
        'click button.fda-search': 'clickSearchType',
		'click button.search-all': 'submitSearch'
    },
    
    render: function() {
        //figure out the correct title
        var title;
        switch(this.searchTarget) {
            case 'LABEL':
                title = '<h1>Can I take this medication?</h1>';
                break;
            case 'RECALL':
                title = '<h1>Has this medication been recalled?</h1>';
                break;
            case 'APPROVED':
                title = '<h1>Is this medication FDA approved?</h1>';
                break;
            default:
                title = 'TITLE NOT CONFIGURED';
        }
        var searchType = this.searchTarget;
        
        //set the title
        $('#full-width-container').html(title);
		
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate());
        
        //enable chaining
        return this;
    },
    
    updateAutocompleteResults: function(q) {
        //split the query into parts
        var apiQ = DataUtils.combineMultipartQuery(q, '+AND+');
        console.log('count results for query %s', apiQ);
        
        //check the search type and react accordingly
        switch(this.searchType) {
            case 'BRAND':
                this.countByBrand(q, apiQ);
                break;
            case 'ALL':
                alert('Cannot search by this yet');
                break;
            case 'GENERIC':
                this.countByGeneric(q, apiQ);
                break;
            case 'INGREDIENT':
                this.countByActive(q, apiQ);
                break;
            default:
                throw new Error('Unexpected search type!');
        }
    },
    
    showProductOptions: function(q) {
        
        //check the search type and react accordingly
        switch(this.searchType) {
            case 'BRAND':
                this.getProductsByBrand(q);
                break;
            case 'ALL':
                alert('Cannot search by this yet');
                break;
            case 'GENERIC':
                this.getProductsByGeneric(q);
                break;
            case 'INGREDIENT':
                this.getProductsByActive(q);
                break;
            default:
                throw new Error('Unexpected search type!');
        }
    },
    
	/*This function is called when the user selects a specific drug in the autopopulate search dropdown. 
	//This function will update the input field with the chosen drug's brand name, and save the selection 
	//and count to use once the user clicks on the Submit button.*/
    chooseResult: function(selection, count) {
		var inputObj = document.getElementsByClassName("form-control");
		if(inputObj !== "undefined" && inputObj.length > 0)
		{
			
			if(typeof(count) != "undefined")
			{
				inputObj[0].value = selection;
			}else if(selection.openfda !== "undefined") {
				inputObj[0].value = selection.openfda.brand_name;
			}
        }
		
		this.selection = selection;
		this.count = count;
		
		var self = this;
		
		if(typeof(count) == "undefined") {
			if(_.isObject(self.selection)) {
				//this is an actual object being passed back - send it to the target page
				console.log('triggering search for %s', self.selection);
				this.trigger('drug-search-complete', {
					type: this.searchType,
					result: self.selection
				});
				return;
			}
			
			//if the selection is not an object, it must be a query term
			if(self.count > 1) {
				//we need the user to choose a product since we have multiple matches
				this.showProductOptions(self.selection);
			} else {
				//only one object to match - just send it back
				//should we go ahead and fetch the actual result object here?
				console.log('triggering search for %s', self.selection);
				this.trigger('drug-search-complete', {
					type: this.searchType,
					q: self.selection
				});
			}
		}
	},
	
	/*This function is called when the user clicks on the Submit button of any search page. If the user had
		previously selected a drug in the autopopulate dropdown, then a search will be performed on that drug
		based on the current search page.*/
	submitSearch: function() {
		var self = this;
		
		if(_.isObject(self.selection)) {
            //this is an actual object being passed back - send it to the target page
            console.log('triggering search for %s', self.selection);
            this.trigger('drug-search-complete', {
                type: this.searchType,
                result: self.selection
            });
            return;
        }
		
		document.getElementById("multi_results_text").innerHTML = (self.count+1) + " results for <b>\"" + self.selection + "\"</b>";
        
        //if the selection is not an object, it must be a query term
        if(self.count > 1) {
            //we need the user to choose a product since we have multiple matches
            this.showProductOptions(self.selection);
        } else {
            //only one object to match - just send it back
            //should we go ahead and fetch the actual result object here?
            console.log('triggering search for %s', self.selection);
            this.trigger('drug-search-complete', {
                type: this.searchType,
                q: self.selection
            });
        }
    },
    
    getProductsByBrand: function(q) {
        var self = this;
        FdaService.findLabelInfoByBrand(q).done(function(data) {
            
            //trim brand data and display
            var exacts = DataUtils.findExactBrandMatches(data.results, q);
            self.displayProductOptions(exacts);
        });
    },
    
    getProductsByActive: function(q) {
        var self = this;
        FdaService.findLabelInfoByIngredient(q).done(function(data) {
            
            //display products
            self.displayProductOptions(data.results);
        });
    },
    
    getProductsByGeneric: function(q) {
        var self = this;
        FdaService.findLabelInfoByGeneric(q).done(function(data) {
            
            //display products
            self.displayProductOptions(data.results);
        });
    },
	    
	//if the selected search term in the autopopulate dropdown results in multiple matches, display a summary of all results to the user.
    displayProductOptions: function(prodList) {
        var self = this;
		
		self.clearPreviousResults();
        
        //console.log('found label data for product list', prodList);
        _.each(prodList, function(item) {
            var view = new DrugProductResultsView({
                result: item,
                callback: _.bind(self.chooseResult, self)
            });
            self.$('#product-result-list').append(view.render().el);
        });

        //show the section
        this.$('#product-results').show();
    },
    
    countByBrand: function(q, apiQ) {
        var self = this;
        
        //search the label database by brand
        this.handleAutocompleteDrugSearch(FdaService.findDrugsByBrand(apiQ), q);
    },
    
    countByGeneric: function(q, apiQ) {
        var self = this;
        
        //search the label database by brand
        this.handleAutocompleteDrugSearch(FdaService.findDrugsByGeneric(apiQ), q);
    },
    
    countByActive: function(q, apiQ) {
        var self = this;
        
        //search the label database by brand
        this.handleAutocompleteDrugSearch(FdaService.findDrugsByActiveIng(apiQ), q);
    },
    
    handleAutocompleteDrugSearch: function(apiPromise, q) {
        var self = this;
        
        apiPromise.done(function(data) {
            
            //only update results if the field value is the same as what was requested
            if(self.$('input[name="brand-name"]').val() === q) {
                self.$('#count-results-list').empty();
                _.each(data.results, function(item) {
                    var view = new DrugSearchResultsView({
                        result: item, 
                        callback: _.bind(self.chooseResult, self)
                    });
					
					//display each result in the autopopulate dropdown ONLY IF the user-entered search term is in the result string
					if(item.term.toLowerCase().indexOf(q.toLowerCase()) > -1)
					{
						self.$('#count-results-list').append(view.render().el);  
					}					
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
	Clears display of previous search results when the user navigates to another search tab.
	**/
	clearPreviousResults: function() {
		
		var productResults = $("#product-results");
		
		if(productResults !== null){
			$("#product-result-list").empty();
			$("#product-results").css("display", "none");
		}
		
		var self = this;
		
		var numChildren = document.getElementById("primary-content").childNodes.length;
				
		if(numChildren > 1)
		{
			document.getElementById("primary-content").lastChild.remove();
		}
		
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
    
    checkEnter: function(event) {
        if(event && (event.which === 13 || event.keyCode === 13)) {
            //do nothing on enter key
            event.preventDefault();
        }
    },
    
    updateAutocomplete: _.debounce(function(event) {
        var val = this.$('input[name="brand-name"]').val();
		//added back autocomplete to approved search. to remove:  && this.searchTarget != "APPROVED"
        if(val && val.length > 2) {
            this.updateAutocompleteResults(val);
        }
    }, 200),
    
    clickSearchType: function(e) {
		this.clearPreviousResults();
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