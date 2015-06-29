'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js';
var PLACES_API_URL = '?libraries=places';
var API_KEY = 'AIzaSyC0l32fdHosB1b5YmlUtlWBfmnUIaI2BMU';

var _instance;

var MapModuleView = Backbone.View.extend({
    el: '#map-module',
    locType: 'pharmacy',
    
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
        
        //Reference to this object because after jquery call, 'this' is different
       var self = this;
       //Function to get and hide places requests
        $('#map-module dt').click(function () {
            var locType = $(this).attr('data-locType');
            if (!$.trim($('dd.' + locType).html())) {
                self.placesRequest(locType);
            } else {
                $('dd.' + locType).html('').slideUp();
            }
        });
    },
    
    loadScript: function() {
        //add listener for custom load event
        $(document).off('map-api-load').one('map-api-load', _.bind(this.initializeMap, this));
        
        //add script for google maps
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = MAPS_API_URL + PLACES_API_URL + '&key=' + API_KEY + '&sensor=true&callback=mapApiLoaded';
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
        
        //Initialize Places
        this.initializePlaces();
    },
    
    initializePlaces: function(){
        //Create the Places Service
        this.placesService = new google.maps.places.PlacesService(this.map);
    },
    
    placesRequest: function(locType){
        var request = {
            location: new google.maps.LatLng(this.location.coords.latitude, this.location.coords.longitude), //Current Coordinates
            radius: '2414', //1.5 miles = 2414 meters
            types: [locType]
        };
        //Set the locType for future reference
        this.locType = locType;
        //Perform the nearby search
        this.placesService.nearbySearch(request, this.callback);
    },

    callback: function (results, status) {
        //Get the saved locType
        var locType = _instance.locType;
        //Make sure the service is working
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var newcontent = '';
            //Loop through the results
            for (var i = 0; i < results.length ; i++) {
                var place = results[i];
                newcontent += '<div><strong>' + place.name  + '</strong><br/>' + place.vicinity + '</div>';
            }
            //Append the results to the correct section, and animate their display
            $('dd.' + locType).html(newcontent).slideDown();
        }
    }
                                         
});

var SingletonWrapper = {
    createInstance: function(location) {
        
        //setup map view
        if(!_instance && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                //init map module
                console.log('initing map');
                _instance = new MapModuleView({location: position});
                _instance.render();
            });
        }
    },
    
    getInstance: function() {
        return _instance;
    }
};

module.exports = SingletonWrapper;