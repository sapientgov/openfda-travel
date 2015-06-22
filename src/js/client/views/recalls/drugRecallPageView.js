'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');
var DrugLabelInfoView = require('./drugRecallInfoView');

var DrugRecallPageView = Backbone.View.extend({
    el: '.main-content',
    
    initialize: function(options) {
        this.drug = options.drug;
    },
    
    render: function() {
        
        //create info view template
        this.labelView = new DrugRecallInfoView({drug: this.drug});
        this.$el.html(this.labelView.render().el);
    },
});

module.exports = DrugRecallPageView;