'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js';
var API_KEY = 'AIzaSyDBieoAwKA8Tz-GczAf8vzcGfUgRrXTtzw';

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
        this.$el.show();
        
        //load script if needed
        if (typeof google === 'undefined') {
            this.loadScript();
        } else {
            //initializd the map
            this.initializeMap();
        }
    },
    
    loadScript: function() {
        console.log('load script');
        //add listener for custom load event
        $(document).off('map-api-load').one('map-api-load', _.bind(this.initializeMap, this));
        
        //add script for google maps
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = MAPS_API_URL + '?key=' + API_KEY + '&sensor=true&callback=mapApiLoaded';
        document.body.appendChild(script);
    },
    
    initializeMap: function() {
        console.log('initialize map');
        //set map cetner
        var center = new google.maps.LatLng(this.location.coords.latitude,this.location.coords.longitude); // approximate DC location;
        var mapOptions = {
            zoom : 14,
            center : center,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true
        };
        
        // Enable the visual refresh
        google.maps.visualRefresh = true;
        
        //create map object
		this.map = new google.maps.Map(this.$('.map-ph').get(0), mapOptions);
    }
                                         
});

module.exports = MapModuleView;