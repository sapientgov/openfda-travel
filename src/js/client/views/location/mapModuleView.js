'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var MapModuleView = Backbone.View.extend({
    el: '#map-module',
    
    initialize: function(options) {
        console.log('initing map');
        if(!options.location) {
            throw new Error('Must supply user location');
        }
        
        this.location = options.location;
    },
    
    render: function() {
        
        //show the map module
        console.log('rendering map');
        console.log(this.$el);
        this.$el.show();
    }
});

module.exports = MapModuleView;