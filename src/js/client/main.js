'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var AppRouter = require('./routes/appRouter');
var MapModuleView = require('./views/location/mapModuleView');
var User = require('./models/user');

//setup map view
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        //init map module
        console.log('initing map');
        var mapView = MapModuleView.createInstance(position);
        mapView.render();
    });
}

//setup user object
//var user = User.createInstance();


//setup router
$(function() {
    //setup router
    window.AppRouter = new AppRouter();

    //start Backbone history
    Backbone.history.start();
});
