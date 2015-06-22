'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var FdaService = require('../../service/fdaService');

var DrugSearchPageView = Backbone.View.extend({
    
    events: {
        'click .query-labelIndex': 'searchSubmit'
    },
    
    render: function() {
        
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate(new Backbone.Model({
            mydata: 'Blah!'
        }).toJSON()));
    },
    
    searchSubmit: function() {
        var q = this.$('input[name="brand-name"]').val();
        console.log('searching for %s', q);
        FdaService.findDrugsByBrand(q).done(function(data) {
            console.log('result received:', data);
        }).fail(function() {
            console.error('call failed!');
        });
    }
});

module.exports = DrugSearchPageView;