'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var AppRouter = require('./routes/appRouter');
var MapModuleView = require('./views/location/mapModuleView');

//setup router
$(function() {
    //setup router
    window.AppRouter = new AppRouter();

    //start Backbone history
    Backbone.history.start();
});
