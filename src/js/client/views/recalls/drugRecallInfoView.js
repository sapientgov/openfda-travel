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
        
        //get drug info
        var recallDrug;
        if(typeof options.drug === 'object') {
            recallDrug = options.drug;
            recallDrug.isRecalled = options.isRecalled;
        } else {
            recallDrug = {
                id: options.drug,
                isRecalled: options.isRecalled
            };
        }
        this.drug = recallDrug;
		
    },
    
    render: function() {
        console.log('rendering label: ', this.drug);
        this.$el.html(this.template(this.drug));
		this.deleteLastResults();

		return this;
    },
	
	deleteLastResults: function() {
		
		var self = this;
		
		var numChildren = $('#primary-content').length;
				
		if(numChildren > 1)
		{
            $('#primary-content:last-child').remove();
		}
		
	}
});

module.exports = DrugRecallInfoView;