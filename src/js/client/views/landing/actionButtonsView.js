'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var UserUtils = require('../../utils/userUtils');

var _instance;

var ActionButtonsView = Backbone.View.extend({
    el: '#action-buttons',
    render: function(options) {
        var view = options.view;
        
        //show all buttons by default
        this.$('.btn-cta').show();
        
        //turn off buttons as needed
        if(view === 'Q') {
            this.$('#action-btn-label').hide();
            this.$('#action-btn-recall').hide();
            this.$('#action-btn-approved').hide();
        }
        if(view === 'LABEL') {
            this.$('#action-btn-label').hide();
        }
        if(view === 'RECALL') {
            this.$('#action-btn-recall').hide();
        }
        if(view === 'APPROVED') {
            this.$('#action-btn-approved').hide();
        }
        
        //update profile button text
        //based on whether the current user is logged in and has a profile
        var user = UserUtils.getCurrentUser();
        if(user && user.get('loggedIn') && user.get('selectedPid')) {
            this.$('#action-btn-profile').text('Add an additional profile');
        } else {
            this.$('#action-btn-profile').text('Personalize your results');
        }
    }
});

var SingletonWrapper = {
    createInstance: function() {
        _instance = new ActionButtonsView();
    },
    
    getInstance: function() {
        return _instance;
    }
};

module.exports = SingletonWrapper;