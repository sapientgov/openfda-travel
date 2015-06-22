'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var FdaService = require('../service/fdaService');

//page view objects
var DrugSearchPageView = require('../views/drug-search/drugSearchPageView');
var DrugLabelInfoView = require('../views/labeling/drugLabelPageView');
var DrugRecallPageView = require('../views/recalls/drugRecallPageView');

var AppRouter = Backbone.Router.extend({
    
    routes: {
        '': 'drugSearch',
        'label/:brand': 'drugLabel',
        'recall/:brand': 'drugRecall'
    },
    
    drugSearch: function() {
        //initialize the drug search page view
        this.currentView = new DrugSearchPageView({el: $('.main-content')});
        this.currentView.render();
    },
    
    drugLabel: function(brand) {
        //find the drug we want
        console.log('getting drug label info for %s.', brand);
        FdaService.findLabelInfoByBrand(brand).done(function(data) {
            //setup view
            if(data.results && data.results.length > 0) {
                this.currentView = new DrugLabelInfoView({drug: data.results[0]});
                this.currentView.render();
            } else {
                console.log('no results returned');
            }
        }).fail(function() {
            console.error('failed to find label by brand');
        });
    },

    drugRecall: function(brand) {
        //find the drug we want based on ndc
        console.log('getting drug recall info for %s.', brand);
        FdaService.findRecallInfoByBrandName(brand).done(function(data) {
            //setup view
            if(data.results && data.results.length > 0) {
                this.currentView = new DrugRecallPageView({drug: data.results[0]});
                this.currentView.render();
            } else {
                console.log('no results returned');
            }
        }).fail(function() {
            console.error('failed to find drug recall info by brand name');
        });
    }

});

module.exports = AppRouter;