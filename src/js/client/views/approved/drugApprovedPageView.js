'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DataUtils = require('../../utils/dataUtils');
var DrugApprovedInfoView = require('./drugApprovedInfoView');
var DrugSearchPageView = require('../drug-search/drugSearchPageView');

var DrugApprovedPageView = Backbone.View.extend({
    el: '#primary-content',
    
    render: function() {
		
        //add the drug search to the page
        this.searchView = new DrugSearchPageView({searchTarget: 'APPROVED'});
        this.$el.html(this.searchView.render().el);
        
        //setup event to listen to search view - when a search is complete
        //add the specified drug info to page
        this.listenTo(this.searchView, 'drug-search-complete', this.renderApprovedInfo);
    },
    
    renderApprovedInfo: function(searchData) {
		
		//if we got an actual result object from the search we just need to show it
        if(searchData.result) {
            
            //remove existing results
            if(this.approvedInfoView) {
                this.approvedInfoView.remove();
            }
			
            //hide the search result stuff
            this.$('#product-results').hide();
			this.approvedInfoView = new DrugApprovedInfoView({drug: searchData.result});
            this.$el.append(this.approvedInfoView.render().el);
            console.log("render approved info: result was found");
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
        console.log('getting drug approved info for %s.', brand);
		var self = this; 
		
		
        FdaService.findLabelInfoByBrand(brand).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
				var exacts = DataUtils.findExactBrandMatches(data.results, brand);
                if (exacts.length > 0) {
                    //for now just take the first result - may need to have the user choose?
                    self.approvedInfoView = new DrugApprovedInfoView({drug: exacts[0]});
					var viewTest = self.approvedInfoView;
					self.$el.append(self.approvedInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status == 404)
			{
				console.log("drug has not been recalled");
				
				var curView = self.approvedInfoView = new DrugApprovedInfoView({drug: brand});
				self.$el.append(self.approvedInfoView.render().el);
			}
        });
    },
	
	    /* This search function is called when the user selects a specific drug in the automated dropdown for the generic search.
	*/
	genericSearch: function(generic) {
        //find the drug we want
        console.log('getting drug approved info for %s.', generic);
		var self = this; 
		
		
        FdaService.findLabelInfoByGeneric(generic).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
                if (data.results.length > 0) {
                    //for now just take the first result - may need to have the user choose?
                    self.approvedInfoView = new DrugApprovedInfoView({drug: data.results[0]});
					var viewTest = self.approvedInfoView;
					self.$el.append(self.approvedInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status == 404)
			{
				console.log("drug has not been recalled");
				
				var curView = self.approvedInfoView = new DrugApprovedInfoView({drug: generic});
				self.$el.append(self.approvedInfoView.render().el);
			}
        });
    },
	
	    /* This search function is called when the user selects a specific drug in the automated dropdown for the ingredient search.
	*/
	activeIngSearch: function(ingredient) {
        //find the drug we want
        console.log('getting drug approved info for %s.', ingredient);
		var self = this; 
		
		
        FdaService.findLabelInfoByIngredient(ingredient).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
                if (data.results.length > 0) {
                    //for now just take the first result - may need to have the user choose?
                    self.approvedInfoView = new DrugApprovedInfoView({drug: data.results[0]});
					var viewTest = self.approvedInfoView;
					self.$el.append(self.approvedInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status == 404)
			{
				console.log("drug has not been recalled");
				
				var curView = self.approvedInfoView = new DrugApprovedInfoView({drug: ingredient});
				self.$el.append(self.approvedInfoView.render().el);
			}
        });
    }
	
});

module.exports = DrugApprovedPageView;