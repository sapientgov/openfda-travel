var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var DrugSearchPageView = Backbone.View.extend({
    
    events: {
        'click .query-labelIndex': 'searchSubmit'
    },
    
    render: function() {
        
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate());
    },
    
    searchSubmit: function() {
        var q = this.$('input[name="brand-name"]').val();
        console.log('searching for %s', q);
    }
});

module.exports = DrugSearchPageView;