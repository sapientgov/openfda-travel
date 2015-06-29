var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Profile = Backbone.Model.extend({
    url: '/profiles',
    defaults: {
        name: '',
        ageRange: '',
        gender: '',
        medications: [],
        conditions: [],
        allergies: []
    }
});

module.exports = Profile;