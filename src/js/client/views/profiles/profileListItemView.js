'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var ProfileListItemView = Backbone.View.extend({
    attributes: {
        class: "profile"
    },
    initialize: function() {
        this.template = _.template($('#profile-item-template').html());
    },
    
    render: function() {
        
        //add the term element
        this.$el.append('<dt class="profile"></dt>');
        this.$('dt').attr('data-profileId', this.model.get('_id')).text(this.model.get('name'));

        //render the template for details
        this.$el.append(this.template(this.model.toJSON()));
        
        //enable chaining
        return this;
    }
});

module.exports = ProfileListItemView;