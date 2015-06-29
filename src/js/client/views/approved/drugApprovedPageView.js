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
		
			//this.brandSearch(searchData.result.openfda.spl_id);
			
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
            }
        }
    },
    
    ///////////
    //just a placeholder for now - not functional
    ////////////
    search: function(brand) {
        //find the drug we want
        console.log('getting drug recall info for %s.', brand);
        FdaService.findRecallInfoByBrandName(brand).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
                var exacts = DataUtils.findExactBrandMatches(data.results, brand);
                if(exacts.length > 0) {
                    
                    //for now just take the first result - may need to have the user choose?
                    this.currentView = new DrugApprovedPageView({drug: exacts[0]});
                    this.currentView.render();
                    return;
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function() {
            console.error('failed to find drug approved by brand');
        });
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
                    self.approvedInfoView = new DrugApprovedInfoView({drug: exacts[0], isApproved: true});
					console.log("98");
					var viewTest = self.approvedInfoView;
					self.approvedInfoView.deleteLastResults();
					self.$el.append(self.approvedInfoView.render().el);
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status == 404)
			{
				console.log("drug has not been recalled");
				
				var curView = self.currentView = new DrugApprovedInfoView({drug: brand, isApproved: false});
				console.log("115");
				self.$el.append(self.currentView.render().el);
			}
        });
    }
});

module.exports = DrugApprovedPageView;