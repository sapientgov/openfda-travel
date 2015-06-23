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

var AppRouter = Backbone.Router.extend({
    
    routes: {
        '': 'intro',
        'label': 'label',
        'recall': 'recall',
        'approved': 'approved',
        'foreign': 'foreign',
        'recall/:brand': 'drugRecall'
    },
    
    intro: function() {
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
        
        //init drug label view
        this.currentView = new DrugLabelPageView();
        this.currentView.render();
    },
    
    recall: function() {
        //get rid of intro content
        this.clearIntroContent();
        
        //init drug recall view
        this.currentView = new DrugRecallPageView();
        this.currentView.render();
   },
    
    approved: function() {
         //get rid of intro content
        this.clearIntroContent();
        
        //init drug approved view
        this.currentView = new DrugApprovedPageView();
        this.currentView.render();
    },
    
    foreign: function() {
        //TODO: IMPLEMENT ME
    },

    drugRecall: function(brand) {
        //find the drug we want based on ndc
        console.log('getting drug recall info for %s.', brand);
        FdaService.findRecallInfoByBrandName(brand).done(function(data) {
            //setup view
            if(data.results && data.results.length > 0) {
                
                //make sure we only include exact matches
                var exacts = DataUtils.findExactBrandMatches(data.results, brand);
                if(exacts.length > 0) {
                    
                    //for now just take the first result - may need to have the user choose?
                    this.currentView = new DrugRecallPageView({drug: exacts[0]});
                    this.currentView.render();
                    return;
                }
            }
            
            //if we get here there were no results we could use
            console.log('no results returned');
        }).fail(function() {
            console.error('failed to find drug recall info by brand name');
        });
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