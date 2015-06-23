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
        
        //clear the existing content out
        this.$el.empty();
        
        //add the drug search to the page
        this.searchView = new DrugSearchPageView({searchTarget: 'APPROVED'});
        this.$el.html(this.searchView.render().el);
        
        //setup event to listen to search view - when a search is complete
        //add the specified drug info to page
        this.listenTo(this.searchView, 'drug-search-complete', this.renderApprovedInfo);
    },
    
    renderApprovedInfo: function(searchData) {
        console.log('Rendering drug recall info!', searchData);
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
    }
});

module.exports = DrugApprovedPageView;