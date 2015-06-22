'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DrugLabelInfoView = require('./drugLabelInfoView');

var DrugLabelPageView = Backbone.View.extend({
    el: '#primary-content',
    
    initialize: function(options) {
        this.drug = options.drug;
    },
    
    render: function() {
        
        //create info view template
        this.labelView = new DrugLabelInfoView({drug: this.drug});
        this.$el.html(this.labelView.render().el);
    },
});

module.exports = DrugLabelPageView;