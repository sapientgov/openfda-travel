'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var EditProfileView = Backbone.View.extend({
    el: '#full-width-container',
    events: {
        'click button.btn-profile-save': 'handleProfileSubmit'
    },
    initialize: function() {
        this.template = _.template($('#edit-profile-template').html());
    },
    
    render: function() {
        this.$el.html(this.template());
    },
    
    handleProfileSubmit: function(e) {
        e.preventDefault();
        
        //set the values into the model
        this.model.set('name', this.$('input[name="name"]').val());
        this.model.set('ageRange', this.$('select[name="age-range"]').val());
        this.model.set('gender', this.$('select[name="gender"]').val());
        
        //save the model
        this.model.save();
    }
});

module.exports = EditProfileView;