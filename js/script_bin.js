/*
var inputObject = {
	"domainInput": {
		"partsLive": ["jdate.com","spark.com","jdate.fr","jdate.co.il","jdate.co.uk","bbwpersonalsplus.com","italiansinglesconnection.com","blacksingles.com"],
		"partSaved": []
	},
	"subDomainInput": {
		"partsLive: ["jdate.com","spark.com","jdate.fr","jdate.co.il","jdate.co.uk","bbwpersonalsplus.com","italiansinglesconnection.com","blacksingles.com"],
		"partSaved": []
	},
	"pathInput": {
		"partsLive": ["jdate.com","spark.com","jdate.fr","jdate.co.il","jdate.co.uk","bbwpersonalsplus.com","italiansinglesconnection.com","blacksingles.com"],
		"partSaved": []
	}
}
*/
//var inputObjectString = JSON.stringify(inputObject);
//var inputObjectBack = JSON.parse(inputObjectString);
//console.log(inputObject);
//console.log(inputObjectString);
//console.log(inputObjectBack);

	
	//function privateMethod() {
		// ...
	//}
	
	//begin spark-specific defaults
	hello.defaultCont.domainInputContLive = ["jdate.com","spark.com","jdate.fr","jdate.co.il","jdate.co.uk","bbwpersonalsplus.com","italiansinglesconnection.com","blacksingles.com"];
	hello.defaultCont.domainInputContSaved = [];
	hello.defaultCont.subDomainInputContLive = ["local"];
	hello.defaultCont.subDomainInputContSaved = ["stgv101","stgv101","stgv102","stgv201","stgv301","preprod","www"];
	hello.defaultCont.pathInputContLive = ["Applications/Logon/Logon.aspx"];
	hello.defaultCont.pathInputContSaved = ["Applications/Home/Default.aspx","Applications/Search/SearchResults.aspx"];
	//end spark-specific defaults
	
	
			//console.log($this.attr('id') + ' partsLive: ' + partsLive);
			//console.log($this.attr('id') + ' partsSaved ' + partsSaved);
			
						
/*			
			console.log('regEx: ' + regEx);
			console.log('$parentObj: ' + $parentObj);
			console.log('inputValue: ' + inputValue);
			console.log('validationError: ' + validationError);
			console.log('$msgElement: ' + $msgElement);
			*/
			
			
		//$(hello).trigger('partCollector', $('#domainInputCont')).trigger('viewSizer');
		//$(hello).trigger('partCollector', $('#subDomainInputCont')).trigger('viewSizer');
		//$(hello).trigger('partCollector', $('#pathInputCont')).trigger('viewSizer');