'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var AppRouter = require('./routes/appRouter');
var MapModuleView = require('./views/location/mapModuleView');

var Bootstrap = require('./libs/bootstrap/bootstrap');
Bootstrap.jQuery = $;

//setup router
$(function() {
    //setup router
    window.AppRouter = new AppRouter();

    //start Backbone history
    Backbone.history.start();
});
