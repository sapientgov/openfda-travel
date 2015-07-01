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
    
    events: {
        'click dt': 'expandProfile'
    },
    
    render: function() {
        var self = this;
        
        //clear anything already present to re-render
        this.$el.empty();
        
        //insert template into DOM
        this.$el.html(this.template());
        
        //insert each profile into the list
        if(this.collection) {
            this.collection.each(function(item, index) {
                var itemView = new ProfileListItemView({
                    model: item
                });
                var $itemDom = itemView.render().$el;
                if(index > 0) {
                    //only show the first item fully
                    $itemDom.find('dd').hide();
                }
                self.$('.profile-list').append($itemDom);
            });
        }
        
        //enable chaining
        return this;
    },
    
    expandProfile: function(e) {
        var $clicked = $(e.target);
        
        //check whether this profile is already expanded
        if(!$clicked.siblings('dd').is(':visible')) {
            //close all of the profiles
            this.$('dd:visible').slideUp();
            $clicked.siblings('dd').slideDown();
        }
    }
});

module.exports = ProfileListView;