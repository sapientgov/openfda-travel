'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');

var DrugApprovedInfoView = Backbone.View.extend({
    
    initialize: function(options) {
        this.template = _.template($('#drug-approved-info').html());
        this.drug = options.drug;
    },
    
    render: function() {
        console.log('rendering approved: ', this.drug);
        this.$el.html(this.template(this.drug));
		
		this.deleteLastResults();
		
        return this;
    },
	
	deleteLastResults: function() {
		
		var self = this;
		
		var numChildren = ('#primary-content').length;
				
		if(numChildren > 1)
		{
            $('#primary-content:last-child').remove();
		}
		
		var approvedRes = document.getElementById("approved-results");
		
		if(approvedRes !== null)
		{
            if(typeof approvedRes.remove === 'function') {
                approvedRes.remove();
            }
		}
	},
});

module.exports = DrugApprovedInfoView;