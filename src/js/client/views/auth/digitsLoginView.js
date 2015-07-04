'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var UserUtils = require('../../utils/userUtils');

var DigitsLoginView = Backbone.View.extend({
    
    events: {
        'click': 'launchLogin'
    },
    
    launchLogin: function(e) {
        e.preventDefault();
        
        //swtich based on current status
        var user = UserUtils.getCurrentUser();
        console.log(user);
        if(user && user.get('loggedIn')) {
            if(confirm('Are you sure you want to log out?')) {
                UserUtils.logout();
                Backbone.history.navigate('', {trigger: true});
            }
        } else {
            UserUtils.login().done(this.loginSuccess);
        }
    },
    
    loginSuccess: function() {
        console.log('login complete! Forwarding onward.');
        Backbone.history.navigate('q', {trigger: true});
    }
});

module.exports = DigitsLoginView;