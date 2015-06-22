var $ = require('jquery');

var LABEL_URL = "https://api.fda.gov/drug/label.json";
var ENFORCEMENT_URL = "https://api.fda.gov/drug/enforcement.json";
var API_KEY = 'JTOlhYSKATIgljRwqs6i8AevZZq0F1Ns2Vx05ehj';
var BEGIN_QS = '?api_key=' + API_KEY;

var FdaService = {
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "brand"
     * attribute
     * 
     * @param {String}  brandQ Brand query to search for
     * @returns {Promise} jQuery promise object for API call
     */
    findDrugsByBrand: function(brandQ) {
        var reqUrl = LABEL_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&count=openfda.brand_name.exact&search=openfda.brand_name:' + brandQ
        
        //make json call
        var deferred = $.Deferred();
        $.getJSON(reqUrl + qs).done(function(data) {
            deferred.resolve(data);
        }).fail(function() {
            deferred.reject();
        });
        
        return deferred.promise();
    },
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "active_ingredient"
     * attribute
     * 
     * @param {String} ingQ Ingredient query to search for
     */
    findDrugsByActiveIng: function(ingQ) {
        throw new Error('not implemented yet');
    },
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "generic"
     * attribute
     * 
     * @param {String} genericQ Generic query to search for
     */
    findDrugsByGeneric: function(genericQ) {
        throw new Error('not implemented yet');
    },
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "brand", "active_ingredient",
     * or "generic" attributes.
     * 
     * @param {String} query Query to search for
     */
    findDrugsByAny: function(query) {
        throw new Error('not implemented yet');
    },
    
    /**
     * Finds all enforcement actions for the drug with
     * the specified NDC ID
     * 
     * @param {String} ndc NDC ID of the target drug
     */
    findRecallInfo: function(ndc) {
        throw new Error('not implemented yet');
    },
    
    /**
     * Retrieves labeling infor for the target drug by NDC ID
     * 
     * @param {String} ndc NDC ID of the target drug
     */
    findLabelInfo: function(ndc) {
        throw new Error('not implemented yet');
    }
};

module.exports = FdaService;