'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');

var DrugRecallInfoView = Backbone.View.extend({
    
    initialize: function(options) {
		this.isRecalled = options.isRecalled;
        this.template = _.template($('#drug-recall-info').html());
		options.drug.isRecalled = options.isRecalled;
        this.drug = options.drug;
		console.log("options: ", options);
		console.log("options.isRecalled: ", options.isRecalled);
		
    },
    
    render: function() {
        console.log('rendering label: ', this.drug);
        this.$el.html(this.template(this.drug));
		this.deleteLastResults();
		
		$( ".fda-approved" ).removeClass("active");
		$("#noBtn").addClass("active");
		
		//console.log("yesBtnJq: ", yesBtnJq);
		return this;
    },
	
	deleteLastResults: function() {
		
		var self = this;
		
		var numChildren = document.getElementById("primary-content").childNodes.length;
				
		if(numChildren > 1)
		{
			document.getElementById("primary-content").lastChild.remove();
		}
		
	}
});

module.exports = DrugRecallInfoView;