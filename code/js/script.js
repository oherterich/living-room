
jQuery(document).ready(function($) {

	$.ajax({
	url : "http://api.wunderground.com/api/b133584ee6715dbc/geolookup/conditions/q/NY/New_York.json",
	dataType : "jsonp",
	success : function(parsed_json) {

	var location = parsed_json['location']['city'];
	var temp_f = parsed_json['current_observation']['temp_f'];
	var weather = parsed_json['current_observation']['weather'];

	//console.log(currentLocation + " " + currentTemp);
	$('#temp h1').html(temp_f + "°");

	if (weather == 'Overcast') {
		$('#weather_image').html("<img src='img/overcast.png'>");
  	}

  	else if (weather == 'Partly Cloudy' || weather == 'Mostly Cloudy' || weather == 'Scattered Clouds') {
		$('#weather_image').html("<img src='img/partlycloudy.png'>");
  	}

  	else if (weather == 'Clear') {
		$('#weather_image').html("<img src='img/clear.png'>");
  	}

  	else if (weather == 'Rain' || weather == 'Drizzle' || weather == 'Spray' || weather == 'Rain Mist' || weather == 'Rain Showers') {
  		$('#weather_image').html("<img src='img/rain.png'>");
  	}

  	else if (weather == 'Snow' || weather == 'Snow Grains' || weather == 'Low Drifting Snow' || weather == 'Blowing Snow' || weather == 'Snow Showers' || weather == 'Snow Blowing Snow Mist' || weather == 'Chance of Snow') {
  		$('#weather_image').html("<img src='img/snow.png'>");
  	}

  	else if (weather == 'Thunderstorm' || weather == 'Thunderstorms and Rain') {
  		$('#weather_image').html("<img src='img/thunderstorm.png'>");
  	}

  	else if (weather == 'Patches of Fog' || weather == 'Shallow Fog' || weather == 'Partial Fog') {
  		$('#weather_image').html("<img src='img/fog.png'>");
  	}

	}
	});



	$.ajax({
	url : "http://api.wunderground.com/api/b133584ee6715dbc/hourly/q/NY/New_York.json",
	dataType : "jsonp",
	success : function(parsed_json) {

		for (var i = 0; i < 10; i++) {
			var hour = parsed_json['hourly_forecast'][i]['FCTTIME']['hour'];
			var temp = parsed_json['hourly_forecast'][i]['temp']['english'];
			var weather = parsed_json['hourly_forecast'][i]['condition'];

			console.log(weather);

			var hourly_forecast = document.getElementById('hourly_forecast');

			var hourly = document.createElement('div');
			hourly.classList.add("hourly");
			hourly_forecast.appendChild(hourly);

			var hourlyImage = document.createElement('img');


			if (weather == 'Overcast') {
				hourlyImage.src = "img/overcast.png";
		  	}

		  	else if (weather == 'Partly Cloudy' || weather == 'Mostly Cloudy' || weather == 'Scattered Clouds') {
				hourlyImage.src = "img/partlycloudy.png";
		  	}

		  	else if (weather == 'Clear') {
				hourlyImage.src = "img/clear.png";
		  	}

		  	else if (weather == 'Rain' || weather == 'Drizzle' || weather == 'Spray' || weather == 'Rain Mist' || weather == 'Rain Showers' || weather == 'Chance of Rain') {
		  		hourlyImage.src ="img/rain.png";
		  	}

		  	else if (weather == 'Snow' || weather == 'Snow Grains' || weather == 'Low Drifting Snow' || weather == 'Blowing Snow' || weather == 'Snow Showers' || weather == 'Snow Blowing Snow Mist' || weather == 'Chance of Snow') {
		  		hourlyImage.src = "img/snow.png";
		  	}

		  	else if (weather == 'Thunderstorm' || weather == 'Thunderstorms and Rain') {
		  		hourlyImage.src = "img/thunderstorm.png";
		  	}

		  	else if (weather == 'Patches of Fog' || weather == 'Shallow Fog' || weather == 'Partial Fog') {
		  		hourlyImage.src = "img/fog.png";
		  	}

		  	hourly.appendChild(hourlyImage);

		  	var thisHour = document.createElement('h3');
			thisHour.innerHTML = hour + ":00  |  " + temp + "°";
			hourly.appendChild(thisHour);
		}
	}
	});


});

//Simple function to map values (similar to Processing's map() function)
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

var mapBackground = function() {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var totalTime = (hour * 3600) + (minute * 60) + second;

	var hue = map_range(totalTime, 0, 86399, 0, 360);

	var body = document.querySelector('body');
	body.style.backgroundColor = "hsl(" + hue + ",70%, 30%)"
}

var checkTime = function(i) {
	if (i<10)
	  {
	  i="0" + i;
	  }
	return i;
}

var time = function() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	// add a zero in front of numbers<10
	h=checkTime(h);
	m=checkTime(m);
	s=checkTime(s);
	document.getElementById('time').innerHTML= h+":"+m;

	prevMinute = today.getMinutes();
}

var date = function() {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var today = new Date();
	var thisDay = today.getDay();
	var thisMonth = today.getMonth();
	var date = today.getDate();
	var year = today.getFullYear();

	document.getElementById('date').innerHTML = days[thisDay] + ", " + months[thisMonth] + " " + date + ", " + year;
} 

var dateDistance = function(year, month, date, hours, minutes, seconds) {
	var today = new Date();

	var christmas = new Date();
	christmas.setFullYear(year);
	christmas.setMonth(month);
	christmas.setDate(date);
	christmas.setHours(hours);
	christmas.setMinutes(minutes);
	christmas.setSeconds(seconds);

	var christmasTime = christmas.getTime();
	var currentTime = today.getTime();
	var totalSecondsUntilChristmas = (christmasTime - currentTime) / 1000;
	
	var daysUntilChristmas = Math.floor(totalSecondsUntilChristmas / 86400);
	var hoursUntilChristmas = Math.floor((totalSecondsUntilChristmas % 86400) / 3600);
	var minutesUntilChristmas = Math.floor((totalSecondsUntilChristmas % 3600) / 60);
	var secondsUntilChristmas = Math.floor((totalSecondsUntilChristmas % 60));

	return {days: daysUntilChristmas, hours: hoursUntilChristmas, minutes: minutesUntilChristmas, seconds: secondsUntilChristmas, total: totalSecondsUntilChristmas};

}

var display = function() {
	time();
	date();
	mapBackground();

	 var christmas = dateDistance(2014, 11, 25, 0, 0, 0);
	 //document.getElementById('christmas').innerHTML = "There are " + christmas.days + " days, " + christmas.hours + " hours, " + christmas.minutes + " minutes, and " + christmas.seconds + " seconds until Christmas! That's " + christmas.total + " total seconds!";
	 document.getElementById('christmas').innerHTML = "<h1>" + christmas.days + "</h1><h3>days until Christmas</h3>"
	 var graduation = dateDistance(2014, 4, 23, 18, 0, 0);
	// document.getElementById('graduation').innerHTML = "There are " + graduation.days + " days, " + graduation.hours + " hours, " + graduation.minutes + " minutes, and " + graduation.seconds + " seconds until Graduation! That's " + graduation.total + " total seconds!";
	 document.getElementById('graduation').innerHTML = "<h1>" + graduation.days + "</h1><h3>days until Graduation</h3>"
	t=setTimeout(function(){display()},500);
}

	display();