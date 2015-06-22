var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

//other things needed
var 

//page view objects
var DrugSearchPageView = require('../views/drug-search/drugSearchPageView');

//private vars
var _results;

var AppRouter = Backbone.Router.extend({
    
    
    routes: {
        '': 'drugSearch'
    },
    
    drugSearch: function() {
        //initialize the drug search page view
        this.currentView = new DrugSearchPageView({el: $('.main-content')});
        this.currentView.render();
    },
});

module.exports = AppRouter;