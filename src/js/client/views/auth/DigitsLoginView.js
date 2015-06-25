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
        
        UserUtils.login().done(this.successCallback);
    }
});

module.exports = DigitsLoginView;