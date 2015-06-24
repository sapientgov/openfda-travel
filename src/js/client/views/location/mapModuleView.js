'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js';
var API_KEY = 'AIzaSyC0l32fdHosB1b5YmlUtlWBfmnUIaI2BMU';

var _instance;

var MapModuleView = Backbone.View.extend({
    el: '#map-module',
    
    initialize: function(options) {
        if(!options.location) {
            throw new Error('Must supply user location');
        }
        
        this.location = options.location;
    },
    
    render: function() {
        
        //show the map module elements
        this.$('.require-gps').slideDown();
        
        //load script if needed
        if (typeof google === 'undefined') {
            this.loadScript();
        } else {
            //initializd the map
            this.initializeMap();
        }
    },
    
    loadScript: function() {
        //add listener for custom load event
        $(document).off('map-api-load').one('map-api-load', _.bind(this.initializeMap, this));
        
        //add script for google maps
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = MAPS_API_URL + '?key=' + API_KEY + '&sensor=true&callback=mapApiLoaded';
        document.body.appendChild(script);
    },
    
    initializeMap: function() {
        //set map cetner
        var center = new google.maps.LatLng(this.location.coords.latitude, this.location.coords.longitude);
        var mapOptions = {
            zoom : 14,
            center : center,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true,
            draggable: false
        };
        
        //create map object
		this.map = new google.maps.Map(this.$('.map-ph').get(0), mapOptions);
        
        //add center marker
        var marker = new google.maps.Marker({
            position: center,
            animation: google.maps.Animation.DROP,
            map: this.map
        });
    }
                                         
});

var SingletonWrapper = {
    createInstance: function(location) {
        _instance = new MapModuleView({location: location});
        return _instance;
    },
    
    getInstance: function() {
        return _instance;
    }
};

module.exports = SingletonWrapper;