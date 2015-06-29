var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Profile = Backbone.Model.extend({
    url: '/profiles',
    defaults: {
        name: ''
    }
});

module.exports = Profile;