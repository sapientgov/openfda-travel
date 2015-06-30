'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var UserUtils = require('../../utils/userUtils');
var DigitsLoginView = require('../auth/digitsLoginView');

var MainHeaderView = Backbone.View.extend({
    el: '#app-header',
    
    initialize: function() {
        
        //setup model events
        this.listenTo(this.model, 'change:loggedIn', this.loginStateChange);
        this.listenTo(this.model.get('profiles'), 'update', this.setupProfileList);
        this.listenTo(this.model, 'change:profiles', this.setupProfileList);
    },
    
    events: {
        'click .profile-link': 'switchProfile',
        'click .login-link': 'loginAction'
    },
    
    render: function() {
            
        //setup profiles
        this.setupProfileList();
        
        this.loginView = new DigitsLoginView({
            el: this.$('.login-link')
        });
    },
    
    setupProfileList: function() {
        var self = this, profHtml = '';
        
        //clear any current entries in the list
        this.$('.profile-link').remove();
        this.$('.profile-div').remove();
        
        //iterate over list
        if(this.model.get('profiles') && this.model.get('profiles').length > 0) {
            //find the selected profile
            var selectedPid = this.model.get('currentPid') || this.model.get('profiles').at(0).get('_id');
            this.model.get('profiles').each(function(item, index) {
                
                //check for selected profile - add it to the front if present
                if(item.get('_id') === selectedPid) {
                    if(self.model.get('profiles').length > 1) {
                        //need to add additional divider
                        profHtml = '<li class="divider profile-div"></li>' + profHtml;
                    }
                    profHtml = '<li><a href="#" class="profile-link primary">' + item.get('name') + '</a></li>' + profHtml;
                } else {
                    //just add it to the end of the list
                    profHtml += '<li><a href="#" class="profile-link">' + item.get('name') + '</a></li>';
                }
            });
            
            //prepend the profile list to the header dropdown
            this.$('#profile-list').prepend(profHtml);
        }
            
    },
    
    loginStateChange: function(model, value, options) {
        if(value) {
            //user is now logged in
            this.$('.login-link').text('Logout');
        } else {
            //user is now logged out
            this.$('.login-link').text('Login');
        }
    }
});

module.exports = MainHeaderView;