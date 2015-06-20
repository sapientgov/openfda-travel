$(function() {
	var filterList = [];
	var fdaAPI = "https://api.fda.gov/drug/enforcement.json";
	
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
				qs += filterList[i][0] + ':"'  + filterList[i][1]+'"';
			}
			qs += "&limit=100";
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

	
	
	function queryDrugRecallInfo(overrideURL){
		var APIurl = overrideURL || "https://api.fda.gov/drug/enforcement.json";
		var qs = constructQuery();
		
		$.getJSON( APIurl+qs,function(data){
			console.log("connection success:\n" + data);
		}).done(function( data ) {
			var contents = "<div>Total found:" + stringifyResult(data.meta.results.total) 
			+ "</div><div>Displaying: "+data.results.length+"</div><br/><br/>";
			var index = 0;
			$.each(data.results, function(){
			  contents += "<div style=\"margin-bottom: 15px;\">"+
			  "<div> Result # "+ (index+1) +
			"</div><div>Generic Name: " + stringifyResult(data.results[index].openfda.generic_name) + 
			"</div><div>Brand Name: " + stringifyResult(data.results[index].openfda.brand_name) +  
			"</div><div>Drug Description: " + stringifyResult(data.results[index].product_description) +  
			"</div><div>Product NDCs: " + stringifyResult(data.results[index].openfda.product_ndc) +  
			"</div><div>Package NDCs: " + stringifyResult(data.results[index].openfda.package_ndc) +  
			"</div><div>Recall Status: " + stringifyResult(data.results[index].status) +  
			"</div><div>Recall Reason: " + stringifyResult(data.results[index].reason_for_recall) +  
			"</div><div>Recall Health Hazard Classifcation: " + stringifyResult(data.results[index].classification) +  
			"</div><div>Applicable Product Codes/ID Numbers: " + stringifyResult(data.results[index].code_info) +  
			"</div><div>Recall Type: " +  stringifyResult(data.results[index].voluntary_mandated) +  
			"</div><div>Recall Scope: " +  stringifyResult(data.results[index].distribution_pattern) +  
			"</div><div>Recall Initiation Date: " +  stringifyResult(data.results[index].recall_initiation_date) +  
			"</div><div>Recall Enforcement Date: " +  stringifyResult(data.results[index].report_date) +  
			"</div><div>FDA Recall Number: " + stringifyResult(data.results[index].recall_number) + 
			"</div><div>Recalling Firm: " + stringifyResult(data.results[index].recalling_firm) + 
			"</div><div><br/></div>";
			index++;			
		    });
			
			$('#results').html( contents );
			filterList = [];
		}).fail(function() {
			$('#results').html('<p>No Results Found</p>');
		});
	}

	
	$('.drug-recall-info-btn-query').click(function(){
		filterList = [];
		var nonEmpty = $('input:text').filter(function() { return this.value != ""; });
		nonEmpty.each(function(){
			addFilter(this.id, this.value);
		});
		queryDrugRecallInfo();
	});
	
	
});