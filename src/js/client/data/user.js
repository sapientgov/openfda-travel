var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var  User = Backbone.Model.extend({
    defaults: {
        profiles: null,
        loggedIn: false,
    }
});

module.exports = User;