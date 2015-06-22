'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DrugLabelInfoView = require('./drugLabelInfoView');

var DrugSearchPageView = Backbone.View.extend({
    el: '.main-content',
    
    initialize: function(options) {
        this.drug = options.drug;
    },
    
    render: function() {
        
        //create info view template
        this.labelView = new DrugLabelInfoView({drug: this.drug});
        this.$el.html(this.labelView.render().el);
    },
});

module.exports = DrugSearchPageView;