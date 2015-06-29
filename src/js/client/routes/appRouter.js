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
var ProfileEditView = require('../views/profiles/profileEditView');
var Profile = require('../data/profile');
var UserUtils = require('../utils/userUtils');
var ProfileListView = require('../views/profiles/profileListView');

var AppRouter = Backbone.Router.extend({
    
    routes: {
        '': 'intro',
        'q': 'questions',
        'label': 'label',
        'recall': 'recall',
        'approved': 'approved',
        'profile(/:id)': 'editProfile',
        'pmanage': 'profileList'
    },
    
    'intro': function() {
        
        //clear
        this.resetContent();
        
        //hide the main content divs
        $('#split-container').hide();
        
        //change section background
        $('body').css('background-image',"url(../img/landing.jpg)");
        
        //setup the landing view
        this.fullView = new AppLandingView();
        this.fullView.render();
    },
    
    questions: function() {
        
        //get rid of existing content
        this.resetContent();
        
        //setup map view
        //TODO - this should probably go somewhere better
        MapModuleView.createInstance();
        
        //change section background
        $('body').css('background-image',"url(../img/home.jpg)");
        
        //add intro content
        this.fullView = new IntroductionContentView();
        this.fullView.render();
        
        //add buttons
        this.mainView = new InitialQuestionsView();
        this.mainView.render();
    },
    
    label: function() {
        //get rid of existing content
        this.resetContent();
        
        //change section background
        $('body').css('background-image',"url(../img/canitakethis.jpg)");
        
        //init drug label view
        this.mainView = new DrugLabelPageView();
        this.mainView.render();
    },
    
    recall: function() {
        //get rid of existing content
        this.resetContent();
        
        //change section background
        $('body').css('background-image',"url(../img/recalled.jpg)");
        
        //init drug recall view
        this.mainView = new DrugRecallPageView();
        this.mainView.render();
   },
    
    approved: function() {
         //get rid of existing content
        this.resetContent();
        
        //change section background
		$('body').css('background-image',"url(../img/approved.jpg)");
        
        //init drug approved view
        this.mainView = new DrugApprovedPageView();
        this.mainView.render();
    },
    
    editProfile: function(pid) {
        //get rid of existing content
        this.resetContent();
        
        //hide the split container
        $('#split-container').hide();
        
        //init the profile edit view
        this.fullView = new ProfileEditView({
            model: new Profile()
        });
        this.fullView.render();
    },
    
    profileList: function() {
        //get rid of existing content
        this.resetContent();
        
        //hide the split container
        $('#split-container').hide();
        
        //init the profile list view
        this.fullView = new ProfileListView({
            el: $('#full-width-container'),
            collection: UserUtils.getCurrentUser().get('profiles')
        });
        this.fullView.render();
        
    },
    
    ///////////////////////////
    //NON-ROUTING FUNCTIONS//
    ///////////////////////////
    
    resetContent: function() {
        $('#full-width-container').empty();
        this.fullView = undefined;
        $('#split-container').show();
        $('#primary-content').empty();
        this.mainView = undefined;
    }
});

module.exports = AppRouter;