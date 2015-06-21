var $ = require('jquery');
module.exports =  {
	test: function(){
		return "Test Successful";
	},

	 stringifyResult: function(resultset, delimiter){
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
	},

	addFilters: function(key, val){
		var filterList = [];
		var nonEmpty = $('input:text').filter(function() { return this.value != ""; });
		if (nonEmpty.length > 0){
			nonEmpty.each(function(){
				filterList.push([this.id, this.value]);
			});
		}
		
		return filterList;
	},

	constructQuery: function(filterArray){
		var qs = '?search=';
		if(filterArray.length > 0){
				console.log('filter found');
			for(i=0; i<filterArray.length;i++){
					if(i>0){
						qs+= "AND";
					}
					qs += filterArray[i][0] + ':"'  + filterArray[i][1]+'"';
			}
				qs += "&limit=100";
		}
			return qs;
	}
};