$(function() {
	var filterList = [];
	var fdaAPI = "https://api.fda.gov/drug/label.json";
	
	function addFilter(key, val){
		filterList.push([key, val]);
		console.log(filterList);
	}
	
	function constructQuery(){
		var qs = '?search=';
		if(filterList.length > 0){
			console.log('filter found');
			for(i=0; i<filterList.length;i++){
				if(i>0){
					qs+= "AND";
				}
				qs += filterList[i][0] + ':'  + filterList[i][1];
			}
			console.log("qs: " + fdaAPI + qs);
		}
		return qs;
	}
	
	function stringifyResult(resultset, delimiter){
		delimiter = delimiter || '<br />';
		var resultString = '';
		if( typeof resultset === 'array' ) {
    		for(i=0;i<resultset.length;i++){
				resultString += resultset[i] + delimiter;
			}
		}else {
			resultString = (!resultset)? "": resultset;
		}
		return resultString;
	}

	
	function queryAPI(overrideURL){
		var APIurl = overrideURL || "https://api.fda.gov/drug/label.json";
		var qs = constructQuery();
		
		$.getJSON( APIurl+qs,function(data){
			console.log("connection success:\n" + data);
		}).done(function( data ) {
			var contents = "";
			$.each(data.results, function(){
			  contents += "<div style=\"margin-bottom: 15px;\"><div>Generic Name: " + stringifyResult(data.results[0].openfda.generic_name) + 
			"</div><div>Purpose: " +  stringifyResult(data.results[0].purpose) + 
			"</div><div>Match Count: " + stringifyResult(data.meta.results.total) + "</div>"
			});
			
			$('#results').html( contents );
			filterList = [];
		}).fail(function() {
			$('#results').html('<p>No Results Found</p>');
		});
	}
	
	function queryLabelInfo(overrideURL){
		var APIurl = overrideURL || "https://api.fda.gov/drug/label.json";
		var qs = constructQuery();
		
		$.getJSON( APIurl+qs,function(data){
			console.log("connection success:\n" + data);
		}).done(function( data ) {
			var contents = "";
			$.each(data, function(){
			  contents += "<div style=\"margin-bottom: 15px;\"><div>Generic Name: " + stringifyResult(data.results[0].openfda.generic_name) + 
			"</div><div>Indications: " + stringifyResult(data.results[0].indications_and_usage) +  
			"</div><div>Warnings: " +  stringifyResult(data.results[0].ask_doctor + " " + data.results[0].boxed_warning) + 
			"</div><div>Adverse Effects: " + stringifyResult(data.results[0].adverse_reactions) +
			"</div><div>Dosage Recommendation: " + stringifyResult(data.results[0].dosage_and_administration) +
			"</div><div>Counter-Indications: " + stringifyResult(data.results[0].contraindications) +
			"</div><div>Special User Groups: " + stringifyResult(data.results[0].use_in_specific_populations + " " + data.results[0].pregnancy + " " + data.results[0].teratogenic_effects + " " + data.results[0].nonteratogenic_effects + " " + data.results[0].labor_and_delivery + " " + data.results[0].nursing_mothers + " " + data.results[0].pregnancy_or_breast_feeding + " " + data.results[0].pediatric_use + " " + data.results[0].geriatric_use) +			"</div>"
			});
			
			$('#results').html( contents );
			filterList = [];
		}).fail(function() {
			$('#results').html('<p>No Results Found</p>');
		});
	}

	$('.btn-query').click(function(){
		filterList = [];
		var nonEmpty = $('input:text').filter(function() { return this.value != ""; });
		nonEmpty.each(function(){
			addFilter(this.id, this.value);
		});
		queryAPI();
	});
	
	$('.label-info-btn-query').click(function(){
		filterList = [];
		var nonEmpty = $('input:text').filter(function() { return this.value != ""; });
		nonEmpty.each(function(){
			addFilter(this.id, this.value);
		});
		queryLabelInfo();
	});
	
	
});