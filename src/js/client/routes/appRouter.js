'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var FdaService = require('../service/fdaService');
var DataUtils = require('../utils/dataUtils');

//page view objects
var DrugSearchPageView = require('../views/drug-search/drugSearchPageView');
var DrugRecallPageView = require('../views/recalls/drugRecallPageView');
var DrugApprovedPageView = require('../views/approved/drugApprovedPageView');
var DrugLabelPageView = require('../views/labeling/drugLabelPageView');
var IntroductionContentView = require('../views/landing/introductionContentView');
var InitialQuestionsView = require('../views/landing/initialQuestionsView');
var MapModuleView = require('../views/location/mapModuleView');

var AppRouter = Backbone.Router.extend({
    
    routes: {
        '': 'intro',
        'label': 'label',
        'recall': 'recall',
        'approved': 'approved'
    },
    
    intro: function() {
        
        //setup location
        if(!this.mapView) {
            this.initMapView();
        }
        
        //add intro content
        this.introView = new IntroductionContentView();
        this.introView.render();
        
        //add buttons
        this.currentView = new InitialQuestionsView();
        this.currentView.render();
    },
    
    label: function() {
        //get rid of intro content
        this.clearIntroContent();
        
        //setup location if needed
        if(!this.mapView) {
            this.initMapView();
        }
        
        //init drug label view
        this.currentView = new DrugLabelPageView();
        this.currentView.render();
    },
    
    recall: function() {
        //get rid of intro content
        this.clearIntroContent();
        
        //setup location if needed
        if(!this.mapView) {
            this.initMapView();
        }
        
        //init drug recall view
        this.currentView = new DrugRecallPageView();
        this.currentView.render();
   },
    
    approved: function() {
         //get rid of intro content
        this.clearIntroContent();
        
        //setup location if needed
        if(!this.mapView) {
            this.initMapView();
        }
        
        //init drug approved view
        this.currentView = new DrugApprovedPageView();
        this.currentView.render();
    },
    
    ///////////////////////////
    //NON-ROUTING FUNCTIONS//
    ///////////////////////////
    
    clearIntroContent: function() {
        //make sure intro content is gone
        if(this.introView) {
            this.introView.remove();
            this.introView = undefined;
        }
    },
    
    initMapView: function() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                //init map module
                this.mapView = new MapModuleView({location: position});
                this.mapView.render();
            });
        }
    }

});

module.exports = AppRouter;