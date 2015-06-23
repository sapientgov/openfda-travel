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
        
        //clear the existing content out
        this.$el.empty();
        
        //add the drug search to the page
        this.searchView = new DrugSearchPageView({searchTarget: 'LABEL'});
        this.$el.html(this.searchView.render().el);
        
        //setup event to listen to search view - when a search is complete
        //add the specified drug info to page
        this.listenTo(this.searchView, 'drug-search-complete', this.renderLabelInfo);
    },
    
    renderLabelInfo: function(searchData) {
        console.log('Rendering label info!', searchData);
		var searchType = searchData.type;
		var brand = searchData.q;
		console.log('Data type: ', searchType);
		console.log('Brand: ', brand);
		if(searchType == 'BRAND')
		{
			this.brandSearch(brand);
		}
    },
    
    ///////////
    //just a placeholder for now - not functional
    ////////////
    brandSearch: function(brand) {
        //find the drug we want
        console.log('getting drug label info for %s.', brand);
		
        FdaService.findLabelInfoByBrand(brand).done(function(data) {
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
                //var exacts = DataUtils.findExactBrandMatches(data.results, brand);
				var exacts = DataUtils.findExactBrandMatches(data.results, brand);
                if(exacts.length > 0) {
                    
                    //for now just take the first result - may need to have the user choose?
                    this.currentView = new DrugLabelInfoView({drug: exacts[0]});
					$('#search-results').append(this.currentView.render().el);
					
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
					
					return;
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
            
        }).fail(function() {
            console.error('failed to find label by brand');
        });
    }
});

module.exports = DrugLabelPageView;