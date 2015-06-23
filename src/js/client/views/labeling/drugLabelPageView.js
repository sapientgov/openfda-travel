'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
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
    }
});

module.exports = DrugLabelPageView;