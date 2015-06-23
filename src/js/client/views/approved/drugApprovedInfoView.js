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
        return this;
    }
});

module.exports = DrugApprovedInfoView;