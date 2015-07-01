'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
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
var ActionButtonsView = require('../views/landing/actionButtonsView');

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
    
    initialize: function() {
        console.log('init  router');
        
        //setup side views
        MapModuleView.createInstance();
        ActionButtonsView.createInstance();
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
        
        //change the questions on the side
        ActionButtonsView.getInstance().render({view: 'Q'});
        
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
        
        //change the questions on the side
        ActionButtonsView.getInstance().render({view: 'LABEL'});
        
        //change section background
        $('body').css('background-image',"url(../img/canitakethis.jpg)");
        
        //init drug label view
        this.mainView = new DrugLabelPageView();
        this.mainView.render();
    },
    
    recall: function() {
        //get rid of existing content
        this.resetContent();
        
        //change the questions on the side
        ActionButtonsView.getInstance().render({view: 'RECALL'});
        
        //change section background
        $('body').css('background-image',"url(../img/recalled.jpg)");
        
        //init drug recall view
        this.mainView = new DrugRecallPageView();
        this.mainView.render();
   },
    
    approved: function() {
         //get rid of existing content
        this.resetContent();
        
        //change the questions on the side
        ActionButtonsView.getInstance().render({view: 'APPROVED'});
        
        //change section background
		$('body').css('background-image',"url(../img/approved.jpg)");
        
        //init drug approved view
        this.mainView = new DrugApprovedPageView();
        this.mainView.render();
    },
    
    editProfile: function(pid) {
        if(this.checkAuth()) {
            //get rid of existing content
            this.resetContent();

            //hide the split container
            $('#split-container').hide();

            //get model
            var editModel;
            if(!_.isEmpty(pid)) {
                editModel = UserUtils.getCurrentUser().get('profiles').find(function(p) {
                    return p.get('_id') === pid;
                });
            } else {
                editModel = new Profile();
            }
            console.log(editModel);

            //init the profile edit view
            this.fullView = new ProfileEditView({
                model: editModel
            });
            $('#full-width-container').html(this.fullView.render().el);
        }
    },
    
    profileList: function() {
        if(this.checkAuth()) {
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
        }
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
    },
    
    checkAuth: function() {
        var user = UserUtils.getCurrentUser();
        if(!user || !user.get('loggedIn')) {
            alert('You must log in to FDA Anywhere first. Use the login link in the header to log in.');
            window.history.back();
            return false;
        }
        return true;
    }
});

module.exports = AppRouter;