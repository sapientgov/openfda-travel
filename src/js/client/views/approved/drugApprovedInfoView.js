'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');

var DrugApprovedInfoView = Backbone.View.extend({
    
    initialize: function(options) {
        this.template = _.template($('#drug-approved-info').html());
		options.drug.isApproved = options.isApproved;
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
		
		var numChildren = document.getElementById("primary-content").childNodes.length;
				
		if(numChildren > 1)
		{
			document.getElementById("primary-content").lastChild.remove();
		}
		
		var approvedRes = document.getElementById("approved-results");
		
		if(approvedRes != null)
		{
			approvedRes.remove();
		}
	},
});

module.exports = DrugApprovedInfoView;