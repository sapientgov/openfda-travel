define(["js/client/helperClass.js" ], function (helperClass) {

function queryAPI(overrideURL){
		var APIurl = overrideURL || "https://api.fda.gov/drug/label.json";
		var qs = constructQuery();
		
		$.getJSON( APIurl+qs,function(data){
			console.log("connection success:\n" + data);
		}).done(function( data ) {
			var contents = "";
			$.each(data, function(){
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

	$('.btn-query').click(function(){
		filterList = [];
		var nonEmpty = $('input:text').filter(function() { return this.value != ""; });
		nonEmpty.each(function(){
			helperClass.addFilter(this.id, this.value);
		});
		queryAPI();
	});
});