'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var UserUtils = require('../../utils/userUtils');

var EditProfileView = Backbone.View.extend({
    events: {
        'click button.btn-profile-save': 'handleProfileSubmit',
		'click button.btn-profile-cancel': 'handleProfileCancel'
    },
    initialize: function() {
        this.template = _.template($('#edit-profile-template').html());
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        
        //set the select values if needed
        this.setSelectValue(this.model.get('ageRange'), 'select[name="age-range"] option');
        this.setSelectValue(this.model.get('gender'), 'select[name="gender"] option');
        
        return this;
    },
	
	handleProfileCancel: function(e) {
		e.preventDefault();
		window.location.replace("/#q");
	},
    
    handleProfileSubmit: function(e) {
        e.preventDefault();
        
        //check that the name field is entered
        if(!this.$('input[name="name"]').val()) {
            alert('Please provide a profile name.');
            return;
        }
        
        var isNew = this.model.isNew();
        
        //set the values into the model
        this.model.set('name', this.$('input[name="name"]').val());
        this.model.set('ageRange', this.$('select[name="age-range"]').val());
        this.model.set('gender', this.$('select[name="gender"]').val());
        this.model.set('medications', this.$('input[name="meds"]').val().split(/\s*,\s*/));
        this.model.set('conditions', this.$('input[name="conditions"]').val().split(/\s*,\s*/));
        this.model.set('allergies', this.$('input[name="allergies"]').val().split(/\s*,\s*/));
        
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