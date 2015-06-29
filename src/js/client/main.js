'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var AppRouter = require('./routes/appRouter');
var UserUtils = require('./utils/userUtils');
var MainHeaderView = require('./views/landing/mainHeaderView');

var Bootstrap = require('./libs/bootstrap/bootstrap');
Bootstrap.jQuery = $;

//setup router
$(function() {
    //setup router
    window.AppRouter = new AppRouter();

    //start Backbone history
    Backbone.history.start();
});

//load initial user
var user = UserUtils.initUser();

//setup the main header view
var header = new MainHeaderView({
    model: user
});
header.render();