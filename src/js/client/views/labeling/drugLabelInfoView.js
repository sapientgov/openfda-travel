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
            self.$(this).closest('dl').find('dd').toggle();
        });

        //toggle the sections
        this.toggleSectionDisplays();
        return this;


        

    },
    
	/**
     * Hides sections that have no data to display
	 */
	toggleSectionDisplays: function() {
        if(this.$('#id-and-versions-data').children().length === 0){
            this.$('#id-and-versions').hide();
        }

        if(this.$('#abuse-and-overdosage-data').children().length === 0){
            this.$('#abuse-and-overdosage').hide();
        }

        if(this.$('#adverse-effects-data').children().length === 0){
            this.$('#adverse-effects').hide();
        }

        if(this.$('#clinical-pharmacology-data').children().length === 0){
            this.$('#clinical-pharmacology').hide();
        }

        if(this.$('#indications-data').children().length === 0){
            this.$('#indications').hide();
        }

        if(this.$('#patient-info-data').children().length === 0){
            this.$('#patient-info').hide();
        }

        if(this.$('#special-populations-data').children().length === 0){
            this.$('#special-populations').hide();
        }

        if(this.$('#non-clinical-tox-data').children().length === 0){
            this.$('#non-clinical-tox').hide();
        }
        if(this.$('#references-data').children().length === 0){
            this.$('#references').hide();
        }

        if(this.$('#supply-data').children().length === 0){
            this.$('#supply').hide();
        }

        if(this.$('#warnings-data').children().length === 0){
            this.$('#warnings').hide();
        }

        if(this.$('#other-fields-data').children().length === 0){
            this.$('#other-fields').hide();
        }

        if(this.$('#open-fda-fields-data').children().length === 0){
            this.$('#open-fda-fields').hide();
        }
	},
});

module.exports = DrugLabelInfoView;