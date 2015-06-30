'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var ActionButtonsView = new Backbone.View.extend({
    initialize: function(options) {
        //supported values are LABEL, RECALL, APPROVED
        this.view = options.view;
    },
    
    render: function() {
        
    }
});