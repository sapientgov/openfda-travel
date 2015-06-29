'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var ProfileListItemView = Backbone.View.extend({
    initialize: function() {
        this.template = _.template($('#profile-item-template').html());
    },
    
    events: {
        'click .link-delete': 'deleteProfile'
    },
    
    render: function() {
        
        //add the term element
        this.$el.append('<dt class="profile"></dt>');
        this.$('dt').attr('data-profileId', this.model.get('_id')).text(this.model.get('name'));

        //render the template for details
        this.$el.append(this.template(this.model.toJSON()));
        
        //enable chaining
        return this;
    },
    
    deleteProfile: function(e) {
        e.preventDefault();
        if(confirm('Are you sure you want to delete this profile?')) {
            this.model.destroy();
        }
    }
});

module.exports = ProfileListItemView;