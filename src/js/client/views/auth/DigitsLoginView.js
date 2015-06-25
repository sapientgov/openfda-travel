'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var UserUtils = require('../../utils/userUtils');

var DigitsLoginView = Backbone.View.extend({
    initialize: function(options) {
        this.successCallback = options.success || $.noop();
    },
    
    events: {
        'click': 'launchLogin'
    },
    
    launchLogin: function() {
        if(typeof Digits === 'undefined') {
            throw new Error('Digits is not yet initialized');
        }
        
        var self = this;
        
        UserUtils.login().done(self.successCallback);
    }
});

module.exports = DigitsLoginView;