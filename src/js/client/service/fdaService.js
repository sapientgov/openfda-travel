'use strict';

var $ = require('jquery');

var LABEL_URL = "https://api.fda.gov/drug/label.json";
var ENFORCEMENT_URL = "https://api.fda.gov/drug/enforcement.json";
var API_KEY = 'JTOlhYSKATIgljRwqs6i8AevZZq0F1Ns2Vx05ehj';
var BEGIN_QS = '?api_key=' + API_KEY;

var FdaService = {
    
    /**
     * Executes JSON query against API and returns promise object
     * @param   {String}  url URL of query
     * @returns {Promise} Promise object to be resolved/rejected on API response
     */
    executeApiQuery: function(url) {
        var deferred = $.Deferred();
        $.getJSON(url).done(function(data) {
            deferred.resolve(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            deferred.reject(jqXHR, textStatus, errorThrown);
        });
        
        return deferred.promise();
    },
    
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
        var qs = BEGIN_QS + '&count=openfda.brand_name.exact&search=openfda.brand_name:' + brandQ;
        
		
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Returns a "count" query from the recall data
     * for all drugs with the specified query in the "brand"
     * attribute
     * 
     * @param {String}  brandQ Brand query to search for
     * @returns {Promise} jQuery promise object for API call
     */
    findDrugRecallsByBrand: function(brandQ) {
        var reqUrl = ENFORCEMENT_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&count=openfda.brand_name.exact&search=openfda.brand_name:' + brandQ;
        
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "active_ingredient"
     * attribute
     * 
     * @param {String} ingQ Ingredient query to search for
     */
    findDrugsByActiveIng: function(ingQ) {
        //throw new Error('not implemented yet');
		
		var reqUrl = LABEL_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&count=openfda.substance_name.exact&search=openfda.substance_name:' + ingQ;
        
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "generic_name"
     * attribute
     * 
     * @param {String} genericQ Generic query to search for
     */
    findDrugsByGeneric: function(genericQ) {
        
		var reqUrl = LABEL_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&count=openfda.generic_name.exact&search=openfda.generic_name:' + genericQ;
		
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Returns a "count" query from the labeling data
     * for all drugs with the specified query in the "brand", "active_ingredient",
     * or "generic" attributes.
     * 
     * @param {String} query Query to search for
     */
    findDrugsByAny: function(query) {
        
		var reqUrl = LABEL_URL;
        
        //add qs parameters 
		//TODO count field may be changed - ask design team
        var qs = BEGIN_QS + '&count=openfda.generic_name.exact&search=openfda.brand_name:' + query + '+openfda.active_ingredient:' + query + '+openfda.generic_name:' + query;
        
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Finds all enforcement actions for the drug with
     * the specified product NDC ID
     * 
     * @param {String} product ndc NDC ID of the target drug
     */
    findRecallInfoByDrugId: function(id) {
        var reqUrl = ENFORCEMENT_URL;
		
        //add qs parameters
        var qs = BEGIN_QS + '&limit=100&search=openfda.spl_id:"' + id + '"';
        console.log('api call: ' + qs);
        
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Retrieves labelling info for for the target drug by NDC ID
     * 
     * @param {String} ndc NDC ID of the target drug
     */
    findLabelInfo: function(ndc) {
        var reqUrl = LABEL_URL;
		
		//add qs parameters
        var qs = BEGIN_QS + '&search=application_number:' + ndc;
        
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Retrieves labelling info for for the target drug by Brand Name
     * 
     * @param {String} brand Brand name of the target drug
     */
    findLabelInfoByBrand: function(brand) {
        var reqUrl = LABEL_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&limit=100&search=openfda.brand_name:"' + brand + '"';
        console.log("fdaService.findLabelInfoByBrand, query is: ", reqUrl + qs);
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Retrieves labelling info for for the target drug by Generic
     * 
     * @param {String} brand Brand name of the target drug
     */
    findLabelInfoByGeneric: function(generic) {
        var reqUrl = LABEL_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&limit=100&search=openfda.generic_name:"' + generic + '"';
        console.log("fdaService.findLabelInfoByGeneric, query is: ", reqUrl + qs);
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    },
    
    /**
     * Retrieves labelling info for for the target drug by Generic
     * 
     * @param {String} brand Ingredient name of the target drug
     */
    findLabelInfoByIngredient: function(ing) {
        var reqUrl = LABEL_URL;
        
        //add qs parameters
        var qs = BEGIN_QS + '&limit=100&search=openfda.substance_name:"' + ing + '"';
        console.log("fdaService.findLabelInfoByIngredient, query is: ", reqUrl + qs);
        //make json call
        return this.executeApiQuery(reqUrl + qs);
    }
};

module.exports = FdaService;