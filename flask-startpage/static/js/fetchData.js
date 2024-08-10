
/*
* Handles smart functionality for the search bar and gets and displays stock and weather data
*
*
*
*
*
*/

const googleUrl = "https://google.com/search?q=";
const youtubeUrl = "https://www.youtube.com/results?search_query=";
const imdbUrl = "https://www.imdb.com/find?q="
const wikipediaUrl = "https://en.wikipedia.org/wiki/Special:Search?go=Go&search="
const rarbgUrl = "https://rarbg.to/torrents.php?search="
const x1337Url = "https://1337x.to/search/"
const netflixUrl = "https://www.netflix.com/search?q="
const redditUrl = "https://www.reddit.com/r/"

$(document).ready(function(){
	
$("#search-bar").keypress(function(event) {
var searchQuery = $("#search-bar").val();
  if ( event.which == 13 ) {
	if (searchQuery.startsWith("youtube ")) {
            window.open(youtubeUrl + searchQuery.substring(8));
          } else if (searchQuery.startsWith("imdb ")) {
            window.open(imdbUrl + searchQuery.substring(5));
          } else if (searchQuery.startsWith("wikipedia ")) {
            window.open(wikipediaUrl + searchQuery.substring(10));
          } else if (searchQuery.startsWith("rarbg ")) {
            window.open(rarbgUrl + searchQuery.substring(6));
          } else if (searchQuery.startsWith("1337x ")) {
            window.open(x1337Url + searchQuery.substring(6) + "/1/");
          } else if (searchQuery.startsWith("netflix ")) {
            window.open(netflixUrl + searchQuery.substring(8));
          } else if (searchQuery.startsWith("reddit ")) {
            window.open(redditUrl + searchQuery.substring(7));
          } else {
            window.open(googleUrl + searchQuery);
		  }
		  document.getElementById("search-bar").value = "";

  }
}); // END Keypress Function	




function snpprice() {

//var alphavantageKey = "{{ alphavantage_api }}"
//var symbol = "{{ alphavantage_symbol }}"
var apiurl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + alphavantageKey;;
    
$.ajax({
  type: "GET",
  url: apiurl,
  async: true,
  dataType: 'json',
  success: function(data){ 
    var price = data["Global Quote"];
	  var priceRounded = Number(price["05. price"]).toFixed(2);
	  const priceUpdate = "$" + priceRounded + " ("+price["10. change percent"] + ")";
	  $("#snp-price").append(priceUpdate);
	  localStorage.setItem('lastPrice', priceUpdate);
    }, 
  error: function(errorMessage){
      console.log("ajax call failed");
    }  
}); // END ajax call	
}

function shouldMakeApiCall() {
	const lastApiCallTime = localStorage.getItem('lastApiCallTime');
	const currentTime = Date.now();

	if (!lastApiCallTime || (currentTime - lastApiCallTime) >= 3600000) {
        console.log('Fetching stock data...');
		snpprice();
		localStorage.setItem('lastApiCallTime', currentTime);
	} else {
        console.log('Using stored stock data...');
		const lastPrice = localStorage.getItem('lastPrice');
		const snpPriceElement = document.getElementById("snp-price");
		snpPriceElement.textContent = lastPrice;
	}
}

shouldMakeApiCall();

	
//Date Functionality
var date = new Date();
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var weekday = weekdays[date.getDay()];
var month = date.getMonth();
var monthday = date.getDate();
var year = date.getYear();	

$('#weekday').html(weekday);
	
switch (monthday) {
	case 1:
	case 21: 
	case 31:
    	var affix = "st";
		$('#month-date').html(months[month] + ", " + monthday + affix + " " + (year+1900));
    	break;
	case 2: 
	case 22:
    	var affix = "nd";
		$('#month-date').html(months[month] + ", " + monthday + affix + " " + (year+1900));
    	break;
	case 3: 
	case 23:
     	var affix = "rd";
		$('#month-date').html(months[month] + ", " + monthday + affix + " " + (year+1900));
   	break;
	case 4: 
	case 5: 
	case 6: 
	case 7: 
	case 8: 
	case 9: 
	case 10: 
	case 11: 
	case 12: 
	case 13: 
	case 14: 
	case 15: 
	case 16: 
	case 17: 
	case 18: 
	case 19: 
	case 20: 
	case 24: 
	case 25: 
	case 26: 
	case 27: 
	case 28: 
	case 29:
	case 30:
   	var affix = "th";
		$('#month-date').html(months[month] + ", " + monthday + affix + " " + (year+1900));
}

function getWeather() {

//var weatherApi = "{{ weather_api }}"
//var weather_lat = "{{ weather_lat }}"
//var weather_lon = "{{ weather_lon }}"
var apiurl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + weather_lat + '&lon=' + weather_lon + '&units=metric&appid=' + weatherApi;
    
$.ajax({
  type: "GET",
  url: apiurl,
  async: false,
  dataType: 'json',
  success: function(data){ 
    var weather = data["main"]["temp"].toFixed(0) + "C";
	var description = data["weather"][0]["description"];
	  $("#month-date").append(" : " + weather + " " + description);
    }, 
  error: function(errorMessage){
	console.log("ajax call failed");
    }  
}); // END ajax call	
}
getWeather();

	
}); // END document ready function	