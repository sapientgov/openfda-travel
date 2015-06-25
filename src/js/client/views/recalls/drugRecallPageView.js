'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DataUtils = require('../../utils/dataUtils');
var DrugRecallInfoView = require('./drugRecallInfoView');
var DrugSearchPageView = require('../drug-search/drugSearchPageView');

var DrugRecallPageView = Backbone.View.extend({
    el: '#primary-content',
    
    render: function() {
        
        //clear the existing content out
        this.$el.empty();
        
        //add the drug search to the page
        this.searchView = new DrugSearchPageView({searchTarget: 'RECALL'});
        this.$el.html(this.searchView.render().el);
        
        //setup event to listen to search view - when a search is complete
        //add the specified drug info to page
        this.listenTo(this.searchView, 'drug-search-complete', this.renderRecallInfo);
    },
    
    renderRecallInfo: function(searchData) {
        console.log('Rendering recall info!', searchData);
        
        //if we got an actual result object from the search we just need to show it
        if(searchData.result) {
		
			this.brandSearch(searchData.result.openfda.spl_id);
			
            //hide the search result stuff
            this.$('#product-results').hide();
            //this.recallInfoView = new DrugRecallInfoView({drug: searchData.result, isRecalled: true});
            //this.$el.append(this.recallInfoView.render().el);
			console.log("render recall info: the drug has been recalled");
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
    
    /*This function hides sections in the recall search results that are empty.
    */
    toggleSectionDisplays: function() {
                    if(document.getElementById('id-and-versions-data').childNodes.length == '1'){
                        document.getElementById('id-and-versions').style.display='none';
                    }
                    
                    if(document.getElementById('abuse-and-overdosage-data').childNodes.length == '1'){
                        document.getElementById('abuse-and-overdosage').style.display='none';
                    }
                    
                    if(document.getElementById('adverse-effects-data').childNodes.length == '1'){
                        document.getElementById('adverse-effects').style.display='none';
                    }
                    
                    if(document.getElementById('clinical-pharmacology-data').childNodes.length == '1'){
                        document.getElementById('clinical-pharmacology').style.display='none';
                    }
                    
                    if(document.getElementById('indications-data').childNodes.length == '1'){
                        document.getElementById('indications').style.display='none';
                    }
                    
                    if(document.getElementById('patient-info-data').childNodes.length == '1'){
                        document.getElementById('patient-info').style.display='none';
                    }
                    
                    if(document.getElementById('special-populations-data').childNodes.length == '1'){
                        document.getElementById('special-populations').style.display='none';
                    }
                    
                    if(document.getElementById('non-clinical-tox-data').childNodes.length == '1'){
                        document.getElementById('non-clinical-tox').style.display='none';
                    }
                    if(document.getElementById('references-data').childNodes.length == '1'){
                        document.getElementById('references').style.display='none';
                    }
                    
                    if(document.getElementById('supply-data').childNodes.length == '1'){
                        document.getElementById('supply').style.display='none';
                    }
                    
                    if(document.getElementById('warnings-data').childNodes.length == '1'){
                        document.getElementById('warnings').style.display='none';
                    }
                    
                    if(document.getElementById('other-fields-data').childNodes.length == '1'){
                        document.getElementById('other-fields').style.display='none';
                    }
                    
                    if(document.getElementById('open-fda-fields-data').childNodes.length == '1'){
                        document.getElementById('open-fda-fields').style.display='none';
                    }
    },
    
    /* This search function is called when the user selects a specific drug in the automated dropdown for the brand search.
    */
    brandSearch: function(drugId) {
        //find the drug we want
        console.log('getting drug recall info for %s.', drugId);
        var self=this;

		//FdaService.findDrugRecallsByBrand(drugId).done(function(data) {
        FdaService.findRecallInfoByDrugId(drugId).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
                //var exacts = DataUtils.findExactBrandMatches(data.results, drugId);
                if(data.results.length > 0) {
                    console.log("drug has been recalled");
                    //for now just take the first result - may need to have the user choose?
                    self.currentView = new DrugRecallInfoView({drug: data.results[0], isRecalled: true});
					self.$el.append(self.currentView.render().el);
                    return;
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('failed to find drug recall by brand');
			if(jqXHR.status == 404)
			{
				console.log("drug has not been recalled");
				
				var curView = self.currentView = new DrugRecallInfoView({drug: drugId, isRecalled: false});
				console.log("currentView: ", curView); 
                self.currentView.render();
				self.$el.append(self.currentView.render().el);
			}
        });
    }
});

module.exports = DrugRecallPageView;