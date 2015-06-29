var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Profile = require('./profile');

var ProfileCollection = Backbone.Collection.extend({
    url: '/profiles',
    model: Profile
});

module.exports = ProfileCollection;