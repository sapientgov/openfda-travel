'use strict';

var _ = require('underscore');

var DataUtils = {
    
    findExactBrandMatches: function(list, value) {
        var matches = [];
        _.each(list, function(item) {
            if(item.openfda.brand_name) {
                
                //look through the list of brand names to see if there is an exact match
                _.each(item.openfda.brand_name, function(itemBrand) {
                    if(itemBrand && itemBrand.toLowerCase() === value.toLowerCase()) {
                        matches.push(item);
                    }
                });
            }
        });
        
        return matches;
    },

    /**
     * Combines a space-separated string into a string separated
     * by the specified separator
     * 
     * @param   {String} q Space seperated query
     * @param   {String} separator Character or string to separate instead of ' '
     * @returns {String} Query separated by specified string
     */
    combineMultipartQuery: function(q, separator) {
        if(!_.isEmpty(q)) {
            var queryParts = q.trim().split(' ');
            return queryParts.join(separator);
        }
        return '';
    }
};

module.exports = DataUtils;