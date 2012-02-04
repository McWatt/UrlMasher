Modernizr.addTest('boxsizing', function () {
  var s = ['boxSizing', 'MozBoxSizing', 'WebkitBoxSizing', 'msBoxSizing'],
      div = document.createElement('div');

  for (var i = 0, l = s.length ; i < l ; i++) {
    if(div.style[s[i]] !=undefined)
      return true;
  } 

  return false;
});

var um = (function () {
	var hello = {},
		$templatePart = $('<span class="part" />');

	//public properties
	hello.defaultCont = {};
	hello.defaultCont.domainInputContLive = ["google.com", "twitter.com", "linkedin.com"];
	hello.defaultCont.domainInputContSaved = ["facebook.com"];
	hello.defaultCont.subDomainInputContLive = ["www"];
	hello.defaultCont.subDomainInputContSaved = ["local","stage","preprod"];
	hello.defaultCont.pathInputContLive = ["blog/"];
	hello.defaultCont.pathInputContSaved = ["about/","contact/"];

	hello.defaultCont.domainInputError = 'You must enter a valid domain.';
	hello.defaultCont.subDomainInputError = 'You must enter a sub-domain.';
	hello.defaultCont.requiredFieldErrorSingle = 'Requires at least one domain.';
	hello.defaultCont.requiredFieldErrorMultiple = 'Requires one selected subdomain';
	hello.inputValidationPassed = true;
	hello.partValidationPassed = true;
	
	//public functions
	hello.setLocalStorage = function (keyName, value) {
		var valueString = JSON.stringify(value);
		localStorage.setItem(keyName, valueString);
	}
	
	hello.getLocalStorage = function (keyName) {
		var keyNameValue = localStorage.getItem(keyName);
		return JSON.parse(keyNameValue);
	}
	
	//custom event bindings
	$(hello).bind('partInsertion',function(event, parentObj, partType){
		//reset validation fail flag
		hello.inputValidationPassed = true;
		
		var $parentObj = $(parentObj),
			$inputObj = $parentObj.find('input'),
			domainValue = $parentObj.find('input').val(),
			$part = $('<span />').addClass('part part-live').html(domainValue).prepend('<span class="remove"></span>');

		//perform validation
		hello.inputValidation($inputObj);
		
		//check validation flag, return if failed
		if(!hello.inputValidationPassed){return}
		
		// perform nsertion if validation passed
		// if singular, set new part to live
		if(partType === 'singular'){
			$parentObj.find('.part.part-live').removeClass('part-live').addClass('part part-saved');
		}
		//inject the new part
		$parentObj.find('.parts').append($part);
		
		//clear input
		$parentObj.find('input').val('');
		
		//trigger save to local storage
		$(hello).trigger('partCollectorAll');
	});
	
	// collects info from DOM and populates local storage
	$(hello).bind('partCollector', function(event, parentObj){
		var $parentObj = $(parentObj);
		var $id = $parentObj.attr('id');

		var $partLive = $parentObj.find('.parts').find('.part-live');
		var $partSaved = $parentObj.find('.parts').find('.part-saved');
		var partLiveArray = [];
		var partSavedArray = [];
		
		$($partLive).each(function(){
			partLiveArray.push($(this).text());
		});
		$($partSaved).each(function(){
			partSavedArray.push($(this).text());
		});

		um.setLocalStorage($id + 'Live', partLiveArray);
		um.setLocalStorage($id + 'Saved', partSavedArray);
	});
	
	$(hello).bind('partCollectorAll', function(event){
		$(hello).trigger('partCollector', $('#domainInputCont'));
		$(hello).trigger('partCollector', $('#subDomainInputCont'));
		$(hello).trigger('partCollector', $('#pathInputCont'));
	});
	
	$(hello).bind('viewSizer', function(event){
		var domainMasherHeight = $('#domainMasher').innerHeight();
		$('#domainMasherView').css('height', domainMasherHeight + 'px');
	});
	
	hello.inputValidation = function ($inputElement){
		var regEx = $inputElement.attr('pattern'),
			$parentObj = $inputElement.closest('.chunk'),
			inputValue = $inputElement.val(),
			validationError = $inputElement.data('validation-error'),
			$msgElement = $('<div class="error-message" />').html(validationError);

		//check against regex
		if(inputValue.match(regEx)){
			hello.inputValidationPassed = true;
		}
		else{
			var $errorMessage = $parentObj.find('.error-message');
			if($errorMessage.length === 0){
				$parentObj.append($msgElement);
			}
			hello.inputValidationPassed = false;
			return;
		}
		// after validation passes, clear error messaging
		$parentObj.find('.error-message').remove();
	}
	
	hello.clearAllValidationMessaging = function (){
		$('.error-message').remove();
	}
	
	//check parts
	hello.partValidation = function ($partContainers){
		var $msgElement = $('<div class="error-message" />');
		$partContainers.each(function(){
			var $this = $(this),
				$partsCont = $this.find('.parts'),
				partsLive = $this.find('.part-live').length,
				partsSaved = $this.find('.part-saved').length;

			if($partsCont.hasClass('parts-multiple required')){
				if(partsLive === 0){
					//console.log('parts-multiple required');
					$this.append($msgElement.clone().html(hello.defaultCont.requiredFieldErrorMultiple));
				}
			}
			if($partsCont.hasClass('parts-single required')){
				if(partsLive !== 1){
					//console.log('parts-single required');
					$this.append($msgElement.clone().html(hello.defaultCont.requiredFieldErrorSingle));
				}
			}
		});
	}
	
	hello.urlMasherUpper = function (viewOutput){
		//get from localStorage		
		var domainData = hello.getLocalStorage("domainInputContLive"),
			subDomainData = hello.getLocalStorage("subDomainInputContLive"),
			pathData = hello.getLocalStorage("pathInputContLive"),
			domainDataSaved = hello.getLocalStorage("domainInputContSaved"),
			subDomainDataSaved = hello.getLocalStorage("subDomainInputContSaved"),
			pathDataSaved = hello.getLocalStorage("pathInputContSaved");
		
		function partsTemplatizer(obj, status, idValue){
			var $obj = $(obj),
				statusClass = "part part-live",
				$partsContainer = $('#' + idValue).find('.parts');
			
			for(i=0; i < obj.length; i++){
				if(status === "Saved"){
					statusClass = "part part-saved";
				}
				$partsContainer.append($('<span />').addClass(statusClass).html('<span class="remove"></span>' + obj[i]));
			}
		}
		
		if(viewOutput === "view"){
			var $domainMasherView = $('#domainMasherView'),
				$domainMasherViewCont = $domainMasherView.find('ul'),
				viewTemplate = "",
				viewTemplateHtml;
			
			$domainMasherView.removeClass('updated, fadeout');
			
			if($domainMasherViewCont.length){
				$domainMasherViewCont.remove();
			}
			
			for(i=0;i < domainData.length; i++){
				var path = subDomainData + '.' + domainData[i] + '/' + pathData;
				viewTemplate += '<li><a href="http://' + path + '">' + path + '</a></li>';
			}
			viewTemplateHtml = '<ul>' + viewTemplate + '</ul>';
			$domainMasherView.append(viewTemplateHtml).addClass('updated');
			setTimeout(function(){$domainMasherView.addClass('fadeout')}, 0);
		}
		
		if(viewOutput === "parts"){
			$('#domainInputCont, #subDomainInputCont, #pathInputCont, #domainInputCont, #subDomainInputCont, #pathInputCont').find('.parts').empty();
			
			partsTemplatizer(domainData, 'Live', 'domainInputCont');
			partsTemplatizer(subDomainData, 'Live', 'subDomainInputCont');
			partsTemplatizer(pathData, 'Live', 'pathInputCont');
			partsTemplatizer(domainDataSaved, 'Saved', 'domainInputCont');
			partsTemplatizer(subDomainDataSaved, 'Saved', 'subDomainInputCont');
			partsTemplatizer(pathDataSaved, 'Saved', 'pathInputCont');
		}
		
	}	

	//onDomReady, insert local data
	$(function(){
		
		//event bindings
		//parts
		$('#domainInputCont, #subDomainInputCont, #pathInputCont').bind('click', function(event){
					
			var $target = $(event.target),
				$partParent = $target.closest('.chunk').find('.parts'),
				$siblings = $target.siblings('.part'),
				settingSingle = ($partParent.hasClass('parts-single')) ? true : false;
			
			//clear error messaging
			if($target.attr('class') === 'remove' || $target.hasClass('part-saved') || $target.hasClass('part-live')){
				hello.clearAllValidationMessaging();
			}
			
			if($target.attr('class') === 'remove'){
				$target.parent('.part').remove();
			}
			else if($target.hasClass('part-saved')){
				$target.removeClass('part-saved').addClass('part-live');
				if(settingSingle === true){
					$siblings.removeClass('part-live').addClass('part-saved');
				}
			}
			else if($target.hasClass('part-live')){
				$target.removeClass('part-live').addClass('part-saved');
				if(settingSingle){
					$siblings.removeClass('part-live').addClass('part-saved');
				}
			}
			//update local storage
			$(hello).trigger('partCollectorAll');
		});
			
		// buttons
		$('#domainInputButton').bind('click', function(){
			$(hello).trigger('partInsertion', [$('#domainInputCont'), 'multiple']);
		});
		
		$('#subDomainInputButton').bind('click', function(){
			$(hello).trigger('partInsertion', [$('#subDomainInputCont'), 'singular']);
		});
		
		$('#pathInputButton').bind('click', function(){
			$(hello).trigger('partInsertion', [$('#pathInputCont'), 'singular']);
		});
		
		$('#domainMasherUpdate').bind('click', function(){
			hello.partValidation($('#domainInputCont, #subDomainInputCont, #pathInputCont'));
			$(hello).trigger('partCollectorAll');
			hello.urlMasherUpper('view');
		});
	
		$('.part-input').keypress(function(event) {
			var partAmount = ($(this).parent('.chunk').find('.parts').hasClass('parts-single')) ? "singular" : "multiple";

			if(event.which == 13) {
				$(hello).trigger('partInsertion', [$(this).parent('.chunk'), partAmount]);
				$(this).val('').focus();
			}
		});
		
		//check for existing localStorage data, if empty
		if(localStorage.getItem('domainInputContLive') === null){
			//populate with dummy content
			um.setLocalStorage('domainInputContLive', hello.defaultCont.domainInputContLive);
			um.setLocalStorage('subDomainInputContLive', hello.defaultCont.subDomainInputContLive);
			um.setLocalStorage('pathInputContLive', hello.defaultCont.pathInputContLive);
			um.setLocalStorage('domainInputContSaved', hello.defaultCont.domainInputContSaved);
			um.setLocalStorage('subDomainInputContSaved', hello.defaultCont.subDomainInputContSaved);
			um.setLocalStorage('pathInputContSaved', hello.defaultCont.pathInputContSaved);
		}
		hello.urlMasherUpper('parts');
		
		if($(window).innerWidth() >= 768){
			$(hello).trigger('viewSizer');
		}
		
		$(window).bind('resize', function(){
			if($(window).innerWidth() >= 768){
				$(hello).trigger('viewSizer');
			}
		});
		
	});
	
	return hello;
}());