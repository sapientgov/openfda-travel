'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var UserUtils = require('../../utils/userUtils');

var EditProfileView = Backbone.View.extend({
    el: '#full-width-container',
    events: {
        'click button.btn-profile-save': 'handleProfileSubmit'
    },
    initialize: function() {
        this.template = _.template($('#edit-profile-template').html());
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        
        //set the select values if needed
        this.setSelectValue(this.model.get('ageRange'), 'select[name="age-range"] option');
        this.setSelectValue(this.model.get('gender'), 'select[name="gender"] option');
    },
    
    handleProfileSubmit: function(e) {
        e.preventDefault();
        
        var isNew = this.model.isNew();
        
        //set the values into the model
        this.model.set('name', this.$('input[name="name"]').val());
        this.model.set('ageRange', this.$('select[name="age-range"]').val());
        this.model.set('gender', this.$('select[name="gender"]').val());
        
        //save the model
        this.model.save(null, {
            success: function(model) {
                
                if(isNew) {
                    //add the new model to the user's profile collection
                    var user = UserUtils.getCurrentUser();
                    user.get('profiles').add(model);
                }

                //navigate to the management page
                Backbone.history.navigate('pmanage', {trigger: true});
            }
        });
    },
    
    setSelectValue: function(value, optionSelector) {
        if(!_.isEmpty(value)) {
            this.$(optionSelector).filter(function() {
                return $(this).val() == value;
            }).prop('selected', true);
        }
    }
});

module.exports = EditProfileView;