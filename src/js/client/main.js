var $ = require('jquery');
var utility = require('./modules/utilities.js');

$(function() {
	$('.query-recallByNDC').click(function(){
		queryDrugRecallInfo();
	});

	$('.query-labelIndex').click(function(){
		queryGeneric();
	});	

	$('.query-label').click(function(){
		queryLabelInfo();
	});	

});	
	var fdaAPI = "https://api.fda.gov/drug/label.json";

	function queryGeneric(){
		var filterList = [];

			var APIurl = "https://api.fda.gov/drug/label.json";
			var q = utility.addFilters();
			var qs = (q.length > 0)? utility.constructQuery(q): "";
			
			console.log("querying API: " + APIurl + "\nsearch params: " + qs);
			$.getJSON( APIurl+qs,function(data){
			}).done(function( data ) {
				outputLabel(data);
			}).fail(function() {
				$('#results').html( "An error occurred." );
			});
		filterList = [];
		
		function outputLabel(dataObj){
			var index = 0;
			var contents = "";
			$.each(dataObj.results, function(){
			 	contents += "<div style=\"margin-bottom: 15px;\"><div>Generic Name: " + utility.stringifyResult(dataObj.results[0].openfda.generic_name) + 
				"</div><div>Purpose: " +  utility.stringifyResult(dataObj.results[0].purpose) + 
				"</div><div>Match Count: " + utility.stringifyResult(dataObj.meta.results.total) + "</div>"
			});
			index++;	
			
			$('#results').html( contents );
		}
	}

	function queryLabelInfo(){
		var filterList = [];

			var APIurl = "https://api.fda.gov/drug/label.json";
			var q = utility.addFilters();
			var qs = (q.length > 0)? utility.constructQuery(q): "";
			
			console.log("querying API: " + APIurl + "\nsearch params: " + qs);
			$.getJSON( APIurl+qs,function(data){
			}).done(function( data ) {
				outputLabel(data);
			}).fail(function() {
				$('#results').html( "An error occurred." );
			});
		filterList = [];
		
		function outputLabel(dataObj){
			var index = 0;
			var contents = "";
			$.each(dataObj.results, function(){
				contents += "<div style=\"margin-bottom: 15px;\"><div>Generic Name: " + utility.stringifyResult(dataObj.results[0].openfda.generic_name) + 
				"</div><div>Indications: " + utility.stringifyResult(dataObj.results[0].indications_and_usage) +  
				"</div><div>Warnings: " +  utility.stringifyResult(dataObj.results[0].ask_doctor + " " + dataObj.results[0].boxed_warning) + 
				"</div><div>Adverse Effects: " + utility.stringifyResult(dataObj.results[0].adverse_reactions) +
				"</div><div>Dosage Recommendation: " + utility.stringifyResult(dataObj.results[0].dosage_and_administration) +
				"</div><div>Counter-Indications: " + utility.stringifyResult(dataObj.results[0].contraindications) +
				"</div><div>Special User Groups: " + utility.stringifyResult(dataObj.results[0].use_in_specific_populations + " " + dataObj.results[0].pregnancy + " " + dataObj.results[0].teratogenic_effects + " " + dataObj.results[0].nonteratogenic_effects + " " + dataObj.results[0].labor_and_delivery + " " + dataObj.results[0].nursing_mothers + " " + dataObj.results[0].pregnancy_or_breast_feeding + " " + dataObj.results[0].pediatric_use + " " + dataObj.results[0].geriatric_use) +			"</div>"
			});
			index++;	
			
			$('#results').html( contents );
		}
	}

	function queryDrugRecallInfo(){
		var filterList = [];

			var APIurl = "https://api.fda.gov/drug/enforcement.json";
			var q = utility.addFilters();
			var qs = (q.length > 0)? utility.constructQuery(q): "";
			
			console.log("querying API: " + APIurl + "\nsearch params: " + qs);
			$.getJSON( APIurl+qs,function(data){
			}).done(function( data ) {
				outputRecall(data);
			}).fail(function() {
				$('#results').html( "An error occurred." );
			});
		filterList = [];
		
		function outputRecall(dataObj){
			var contents = "<div>Total found:" + utility.stringifyResult(dataObj.meta.results.total) 
				+ "</div><div>Displaying: "+dataObj.results.length+"</div><br/><br/>";
			var index = 0;
			$.each(dataObj.results, function(){
			    contents += "<div style=\"margin-bottom: 15px;\">"+
			    "<div> Result # "+ (index+1) +
				"</div><div>Generic Name: " + utility.stringifyResult(dataObj.results[index].openfda.generic_name) + 
				"</div><div>Brand Name: " + utility.stringifyResult(dataObj.results[index].openfda.brand_name) +  
				"</div><div>Drug Description: " + utility.stringifyResult(dataObj.results[index].product_description) +  
				"</div><div>Product NDCs: " + utility.stringifyResult(dataObj.results[index].openfda.product_ndc) +  
				"</div><div>Package NDCs: " + utility.stringifyResult(dataObj.results[index].openfda.package_ndc) +  
				"</div><div>Recall Status: " + utility.stringifyResult(dataObj.results[index].status) +  
				"</div><div>Recall Reason: " + utility.stringifyResult(dataObj.results[index].reason_for_recall) +  
				"</div><div>Recall Health Hazard Classifcation: " + utility.stringifyResult(dataObj.results[index].classification) +  
				"</div><div>Applicable Product Codes/ID Numbers: " + utility.stringifyResult(dataObj.results[index].code_info) +  
				"</div><div>Recall Type: " +  utility.stringifyResult(dataObj.results[index].voluntary_mandated) +  
				"</div><div>Recall Scope: " +  utility.stringifyResult(dataObj.results[index].distribution_pattern) +  
				"</div><div>Recall Initiation Date: " +  utility.stringifyResult(dataObj.results[index].recall_initiation_date) +  
				"</div><div>Recall Enforcement Date: " +  utility.stringifyResult(dataObj.results[index].report_date) +  
				"</div><div>FDA Recall Number: " + utility.stringifyResult(dataObj.results[index].recall_number) + 
				"</div><div>Recalling Firm: " + utility.stringifyResult(dataObj.results[index].recalling_firm) + 
				"</div><div><br/></div>";
				index++;			
		    });
			
			$('#results').html( contents );
		}
		
			
	}

