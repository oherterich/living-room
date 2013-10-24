jQuery(document).ready(function($) {

	$.ajax({
	url : "http://api.wunderground.com/api/b133584ee6715dbc/geolookup/conditions/q/NY/New_York.json",
	dataType : "jsonp",
	success : function(parsed_json) {

	var location = parsed_json['location']['city'];
	var temp_f = parsed_json['current_observation']['temp_f'];

	//console.log(currentLocation + " " + currentTemp);
	$('#temp').html("The temperature in " + location + " is " + temp_f + ".");
	}
	});



	$.ajax({
	url : "http://api.wunderground.com/api/b133584ee6715dbc/hourly/q/NY/New_York.json",
	dataType : "jsonp",
	success : function(parsed_json) {

		for (var i = 0; i < 10; i++) {
			var hour = parsed_json['hourly_forecast'][i]['FCTTIME']['hour'];
			var temp = parsed_json['hourly_forecast'][i]['temp']['english'];
			var condition = parsed_json['hourly_forecast'][i]['condition'];

			var thisHour = document.createElement('h3');
			thisHour.innerHTML = "At " + hour + ":00 it will be " + temp + " and " + condition;
			var content = document.getElementById('content');
			content.appendChild(thisHour);
		}
	}
	});


});

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
	document.getElementById('time').innerHTML= h+":"+m+":"+s;
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
	var christmas = dateDistance(2013, 11, 25, 0, 0, 0);
	document.getElementById('christmas').innerHTML = "There are " + christmas.days + " days, " + christmas.hours + " hours, " + christmas.minutes + " minutes, and " + christmas.seconds + " seconds until Christmas! That's " + christmas.total + " total seconds!";

	var graduation = dateDistance(2014, 4, 23, 18, 0, 0);
	document.getElementById('graduation').innerHTML = "There are " + graduation.days + " days, " + graduation.hours + " hours, " + graduation.minutes + " minutes, and " + graduation.seconds + " seconds until Graduation! That's " + graduation.total + " total seconds!";

	t=setTimeout(function(){display()},500);
}

	display();