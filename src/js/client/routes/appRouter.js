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
var AppLandingView = require('../views/landing/appLandingView');

var AppRouter = Backbone.Router.extend({
    
    routes: {
        '': 'intro',
        'q': 'questions',
        'label': 'label',
        'recall': 'recall',
        'approved': 'approved'
    },
    
    'intro': function() {
        
        //get rid of intro content
        this.clearIntroContent();
        
        //setup the landing view
        this.landingView = new AppLandingView();
        this.landingView.render();
    },
    
    questions: function() {
        
        //get rid of intro content
        this.clearLanding();
        
        //setup map view
        //TODO - this should probably go somewhere better
        MapModuleView.createInstance();
        
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
        this.clearLanding();
        
        //init drug label view
        this.currentView = new DrugLabelPageView();
        this.currentView.render();
    },
    
    recall: function() {
        //get rid of intro content
        this.clearIntroContent();
        this.clearLanding();
        
        //init drug recall view
        this.currentView = new DrugRecallPageView();
        this.currentView.render();
   },
    
    approved: function() {
         //get rid of intro content
        this.clearIntroContent();
        this.clearLanding();
        
        //init drug approved view
        this.currentView = new DrugApprovedPageView();
        this.currentView.render();
    },
    
    ///////////////////////////
    //NON-ROUTING FUNCTIONS//
    ///////////////////////////
    
    clearLanding: function() {
        $('.landing-page').remove();
        $('#container-main .row').show();
    },
    
    clearIntroContent: function() {
        //make sure intro content is gone
        if(this.introView) {
            this.introView.remove();
            this.introView = undefined;
        }
    }

});

module.exports = AppRouter;