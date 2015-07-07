'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var UserUtils = require('../../utils/userUtils');

var DrugLabelInfoView = Backbone.View.extend({
    attributes: {
        class: 'drug-content'
    },
    
    initialize: function(options) {
        this.template = _.template($('#drug-label-info').html());
        this.drug = options.drug;
    },
    
    render: function() {
        console.log('rendering label: ', this.drug);
        this.$el.html(this.template(this.drug));
        
        //init tooltips
        this.$('[data-toggle="tooltip"]').tooltip();
        
        var self = this;
        this.$('dt').click(function(){
            self.$(this).toggleClass('expanded');
            self.$(this).closest('dl').find('dd').slideToggle();
        });

        //toggle the sections
        this.toggleSectionDisplays();
		this.deleteLastResults();

        
        //personalize results
        this.personalizeLabelResults();
        
        return this;

    },
    
    personalizeLabelResults: function() {
        
        //get & verify user 
        var user = UserUtils.getCurrentUser(), self = this;
        if(!user || !user.get('loggedIn') || !user.get('selectedPid') || !user.get('profiles')) {
            //cannot personalize results because there is no available profile
            console.log('cannot personalize');
            return;
        }
        
        //get selected profile
        var profile = user.get('profiles').find(function(item) {
            return item.get('_id') === user.get('selectedPid');
        });
        
        //find sections to flag
        this.$('.label-section').each(function() {
            var $dd = $(this).find('dd'),
                sectionContent = $dd.html(),
                flagged = false, key;
            
            //go through profile attributes and find matches
            flagged = self.findKeywordInContent(profile, 'medications', sectionContent, flagged);
            flagged = self.findKeywordInContent(profile, 'conditions', sectionContent, flagged);
            flagged = self.findKeywordInContent(profile, 'allergies', sectionContent, flagged);
            
            //add warning icon if section flagged
            if(flagged) {
                $dd.siblings('dt').append('<a class="flag warning"><i class="fa fa-exclamation-circle"></i></a>');
            }
        });
    },
    
    findKeywordInContent: function(profile, attr, content, flagged) {
        if(flagged) {
            return true;
        }
        
        var list = profile.get(attr);
        for(var key in list) {
            if(!_.isEmpty(list[key]) && content.indexOf(list[key]) >= 0) {
                return true;
            }
        }
        return false;
    },
    
	
	deleteLastResults: function() {
		
		var self = this;
		
		//var numChildren = $('#primary-content').children().length;
        //console.log('numChild = ' + numChildren);
		//if(numChildren > 1)
		//{
        //    console.log('******removing last child');
        //    $('#primary-content div:last-child').remove();
		//}
        
		
	},
    
	/**
     * Hides sections that have no data to display
	 */
	toggleSectionDisplays: function() {
        
        if(this.$('#warnings-data').children().length === 0){
            this.$('#warnings').hide();
        }

        if(this.$('#abuse-and-overdosage-data').children().length === 0){
            this.$('#abuse-and-overdosage').hide();
        }

        if(this.$('#adverse-effects-data').children().length === 0){
            this.$('#adverse-effects').hide();
        }

        if(this.$('#indications-data').children().length === 0){
            this.$('#indications').hide();
        }

        if(this.$('#special-populations-data').children().length === 0){
            this.$('#special-populations').hide();
        }
	},
});

module.exports = DrugLabelInfoView;