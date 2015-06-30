'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');

var DrugLabelInfoView = Backbone.View.extend({
    
    initialize: function(options) {
        this.template = _.template($('#drug-label-info').html());
        this.drug = options.drug;
    },
    
    render: function() {
        console.log('rendering label: ', this.drug);
        this.$el.html(this.template(this.drug));
        
        var self = this;
        this.$('dt').click(function(){
            self.$(this).toggleClass('expanded');
            self.$(this).closest('dl').find('dd').slideToggle();
        });

        //toggle the sections
        this.toggleSectionDisplays();
		this.deleteLastResults();
        
        //update the heigh of sections based on content length
        this.$('.label-section').each(function() {
            var $dd = $(this).find('dd');
            var contentLength = $dd.html().length;
            if(contentLength >= 3200) {
                //XXL
                $dd.siblings('dt').css('min-height', '200px');
                $dd.css('margin-top', '-150px');
            } else if (contentLength < 3200 && contentLength >= 1600) {
                //XL
                $dd.siblings('dt').css('min-height', '150px');
                $dd.css('margin-top', '-100px');
            } else if (contentLength < 1600 && contentLength >= 800) {
                //L
                $dd.siblings('dt').css('min-height', '100px');
                $dd.css('margin-top', '-50px');
            } else if (contentLength < 800 && contentLength >= 400) {
                //M
                $dd.siblings('dt').css('min-height', '75px');
                $dd.css('margin-top', '-25px');
            } else if (contentLength < 400) {
                //S
                $dd.siblings('dt').css('min-height', '50px');
            }
        });
        
        return this;

    },
	
	deleteLastResults: function() {
		
		var self = this;
		
		var numChildren = document.getElementById("primary-content").childNodes.length;
				
		if(numChildren > 1)
		{
			document.getElementById("primary-content").lastChild.remove();
		}
		
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