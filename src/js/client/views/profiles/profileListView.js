'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var ProfileListItemView = require('./profileListItemView');

var ProfileListView = Backbone.View.extend({
    initialize: function() {
        this.template = _.template($('#list-profiles-template').html());
        this.listenTo(this.collection, 'update', this.render);
    },
    
    render: function() {
        var self = this;
        
        //clear anything already present to re-render
        this.$el.empty();
        
        //insert template into DOM
        this.$el.html(this.template());
        
        //insert each profile into the list
        if(this.collection) {
            this.collection.each(function(item) {
                var itemView = new ProfileListItemView({
                    model: item
                });
                self.$('.profile-list').append(itemView.render().el);
            });
        }
        
        //enable chaining
        return this;
    }
});

module.exports = ProfileListView;