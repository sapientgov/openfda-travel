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
    }
};

module.exports = DataUtils;