'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var DrugProductResultsView = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click': 'handleSelect'
    },
    initialize: function(options) {
        this.result = options.result;
        this.callback = options.callback;
        this.template = _.template($('#search-product-result').html());
    },
    render: function() {
        //console.log('rendering product: %s', this.result.openfda.brand_name);
        this.$el.html(this.template(this.result));
        return this;
    },
    handleSelect: function() {
        console.log('triggering result callback', this.result);
        this.callback(this.result);
    }
});

module.exports = DrugProductResultsView;