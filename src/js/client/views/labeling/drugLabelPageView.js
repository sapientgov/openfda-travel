'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DataUtils = require('../../utils/dataUtils');
var DrugLabelInfoView = require('./drugLabelInfoView');
var DrugSearchPageView = require('../drug-search/drugSearchPageView');

var DrugLabelPageView = Backbone.View.extend({
    el: '#primary-content',
    
    render: function() {
        console.log('drugLabelPageView');
        
        //add the drug search to the page
        this.searchView = new DrugSearchPageView({searchTarget: 'LABEL'});
        this.$el.html(this.searchView.render().el);
        
        //setup event to listen to search view - when a search is complete
        //add the specified drug info to page
        this.listenTo(this.searchView, 'drug-search-complete', this.renderLabelInfo);
    },
    
    renderLabelInfo: function(searchData) {
        console.log('Rendering label info!', searchData);
        
        //remove existing label results
        if(this.labelInfoView) {
            this.labelInfoView.remove();
        }
        
        //if we got an actual result object from the search we just need to show it
        if(searchData.result) {
            //hide the search result stuff
            this.$('#product-results').hide();
            this.labelInfoView = new DrugLabelInfoView({drug: searchData.result});
            this.$el.append(this.labelInfoView.render().el);
        } else {

            var searchType = searchData.type;
            var brand = searchData.q;
            console.log('Data type: ', searchType);
            console.log('Brand: ', brand);
            if(searchType == 'BRAND')
            {
                this.brandSearch(brand);
            }else if(searchType == 'GENERIC')
			{
				this.genericSearch(brand);
			}else if(searchType == 'INGREDIENT')
			{
				this.activeIngSearch(brand);
			}
        }
    },
	
    /* This search function is called when the user selects a specific drug in the automated dropdown for the brand search.
	*/
	brandSearch: function(brand) {
        //find the drug we want
        console.log('getting drug label info for %s.', brand);
		var self = this; 
		
		
        FdaService.findLabelInfoByBrand(brand).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
				var exacts = DataUtils.findExactBrandMatches(data.results, brand);
                if (exacts.length > 0) {
                    
                    //for now just take the first result - may need to have the user choose?
                    self.labelInfoView = new DrugLabelInfoView({drug: exacts[0]});
					self.$el.append(self.labelInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function() {
            console.error('failed to find label by brand');
        });
    },
	
	/* This search function is called when the user selects a specific drug in the automated dropdown for the brand search.
	*/
	genericSearch: function(generic) {
        //find the drug we want
        console.log('getting drug label info for %s.', generic);
		var self = this; 
		
		
        FdaService.findLabelInfoByGeneric(generic).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                if (data.results.length > 0) {
                    //for now just take the first result - may need to have the user choose?
                    self.labelInfoView = new DrugLabelInfoView({drug: data.results[0]});
					self.$el.append(self.labelInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function() {
            console.error('failed to find label by generic');
        });
    },
	
	/* This search function is called when the user selects a specific drug in the automated dropdown for the active ingredient search.
	*/
	activeIngSearch: function(activeIng) {
        //find the drug we want
        console.log('getting drug label info for %s.', activeIng);
		var self = this; 
		
		
        FdaService.findLabelInfoByIngredient(activeIng).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                if (data.results.length > 0) {
                    //for now just take the first result - may need to have the user choose?
                    self.labelInfoView = new DrugLabelInfoView({drug: data.results[0]});
					self.$el.append(self.labelInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function() {
            console.error('failed to find label by active ingredient');
        });
    }
});

module.exports = DrugLabelPageView;