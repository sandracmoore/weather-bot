//https://github.com/craigprotzel/weather-world --> tutorial followed  // 

//Weather API call
var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=733206d578f743da1c287bfbe5f9cc38';


// following is spliced from tracery.demo, but which isn't working as of the moment
// var jsonObj = loadJsonFromFile("weather.json");
// console.log(jsonObj);
// WHAT IS GOING UNDERNEATH??? WHAT DO I DOOOO

function loadJsonFromFile(filename) {
	$.getJSON(filename, function(json) {
		return json;
  	});
};

function createHTML(cityName, tempValue){
	var tClass;
	var text = "";

	var grammar = tracery.createGrammar(library);

	if (tempValue >= 90){
		tClass = 'red';
	}

	else if (tempValue < 90 && tempValue >= 70){
		tClass = 'yellow';
	}
	else if (tempValue < 70 && tempValue >= 50){
		tClass = 'green';
	}
	else if (tempValue < 50 && tempValue >= 30){
		tClass = 'blue';
		// which_weather = 'hot_weather'
	}
	else {
		tClass = 'gray';
		// which_weather = 'weather.json'
	}

	text = grammar.flatten("#" + tClass + "#");
	
	$('#content').html(text);

    // end spliced code from tracery


	var htmlString =	'<div class="setBorder ' + tClass + '">' +
											'<div class="weatherCity">' + cityName + '</div>' +
											//'<div class="weatherData">' + tempValue + '</div>' +
										'</div>';
	$('#weatherResults').empty().prepend(htmlString);
}

//Ajax Call (not sure what this is??)
var searchWeather = function(city){

	var searchURL = weatherBaseURL + city + weatherQueryParams;

	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("We got problems");
			console.log(data.status);
			alert("Oh no. Something went wrong...");
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);
			if (data.cod === '404'){
				alert("Oh no. Something went wrong. Try another city");
				return;
			}

			$("#query").val('');

			var theCity = data.name || '????';
			var theTemp = Math.round(data.main.temp) || 70;


				createHTML(theCity, theTemp);
		}
	});
};

//Code to be executed once the page has fully loaded
$(document).ready(function(){
	console.log("Fully Loaded, Herbie!");

	//Use jQuery to assign a (callback) function to occur when the 'search' button is clicked
	$("#search").on('click', function(){
		console.log("Clicked search");
		//Use jQuery to get the value of the 'query' input box
		var newSearchTerm = $("#query").val();
		console.log(newSearchTerm);
		//Execute the Weather API call with the 'newSearchTerm' string as its argument 
		searchWeather(newSearchTerm);
		$("#search").blur();

	});





	//What if someone just wants to click "ENTER"???
	//Use jQuery to assign a (callback) function to occur when enter is pressed 
	//This will ONLY work when the '#query' input box is active
	$('#query').on('keypress', function(e){
		//If enter key is pressed
		if (e.which == 13){
			//Use jQuery's trigger() function to execute a click event on the '#search' element
			$("#search").trigger('click');
		}
	});

});



