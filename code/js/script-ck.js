jQuery(document).ready(function(e){e.ajax({url:"http://api.wunderground.com/api/b133584ee6715dbc/geolookup/conditions/q/NY/New_York.json",dataType:"jsonp",success:function(t){var n=t.location.city,r=t.current_observation.temp_f,i=t.current_observation.weather;e("#temp h1").html(r+"°");i=="Overcast"?e("#weather_image").html("<img src='img/overcast.png'>"):i=="Partly Cloudy"||i=="Mostly Cloudy"||i=="Scattered Clouds"?e("#weather_image").html("<img src='img/partlycloudy.png'>"):i=="Clear"?e("#weather_image").html("<img src='img/clear.png'>"):i=="Rain"||i=="Drizzle"||i=="Spray"||i=="Rain Mist"||i=="Rain Showers"?e("#weather_image").html("<img src='img/rain.png'>"):i=="Snow"||i=="Snow Grains"||i=="Low Drifting Snow"||i=="Blowing Snow"||i=="Snow Showers"||i=="Snow Blowing Snow Mist"?e("#weather_image").html("<img src='img/snow.png'>"):i=="Thunderstorm"||i=="Thunderstorms and Rain"?e("#weather_image").html("<img src='img/thunderstorm.png'>"):(i=="Patches of Fog"||i=="Shallow Fog"||i=="Partial Fog")&&e("#weather_image").html("<img src='img/fog.png'>")}});e.ajax({url:"http://api.wunderground.com/api/b133584ee6715dbc/hourly/q/NY/New_York.json",dataType:"jsonp",success:function(e){for(var t=0;t<10;t++){var n=e.hourly_forecast[t].FCTTIME.hour,r=e.hourly_forecast[t].temp.english,i=e.hourly_forecast[t].condition,s=document.getElementById("hourly_forecast"),o=document.createElement("div");o.classList.add("hourly");s.appendChild(o);var u=document.createElement("img");if(i=="Overcast")u.src="img/overcast.png";else if(i=="Partly Cloudy"||i=="Mostly Cloudy"||i=="Scattered Clouds")u.src="img/partlycloudy.png";else if(i=="Clear")u.src="img/clear.png";else if(i=="Rain"||i=="Drizzle"||i=="Spray"||i=="Rain Mist"||i=="Rain Showers"||i=="Chance of Rain")u.src="img/rain.png";else if(i=="Snow"||i=="Snow Grains"||i=="Low Drifting Snow"||i=="Blowing Snow"||i=="Snow Showers"||i=="Snow Blowing Snow Mist")u.src="img/snow.png";else if(i=="Thunderstorm"||i=="Thunderstorms and Rain")u.src="img/thunderstorm.png";else if(i=="Patches of Fog"||i=="Shallow Fog"||i=="Partial Fog")u.src="img/fog.png";o.appendChild(u);var a=document.createElement("h3");a.innerHTML=n+":00  |  "+r+"°";o.appendChild(a)}}})});var checkTime=function(e){e<10&&(e="0"+e);return e},time=function(){var e=new Date,t=e.getHours(),n=e.getMinutes(),r=e.getSeconds();t=checkTime(t);n=checkTime(n);r=checkTime(r);document.getElementById("time").innerHTML=t+":"+n},date=function(){var e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date,r=n.getDay(),i=n.getMonth(),s=n.getDate(),o=n.getFullYear();document.getElementById("date").innerHTML=e[r]+", "+t[i]+" "+s+", "+o},dateDistance=function(e,t,n,r,i,s){var o=new Date,u=new Date;u.setFullYear(e);u.setMonth(t);u.setDate(n);u.setHours(r);u.setMinutes(i);u.setSeconds(s);var a=u.getTime(),f=o.getTime(),l=(a-f)/1e3,c=Math.floor(l/86400),h=Math.floor(l%86400/3600),p=Math.floor(l%3600/60),d=Math.floor(l%60);return{days:c,hours:h,minutes:p,seconds:d,total:l}},display=function(){time();date();var e=dateDistance(2013,11,25,0,0,0);document.getElementById("christmas").innerHTML="<h1>"+e.days+"</h1><h3>days until Christmas</h3>";var n=dateDistance(2014,4,23,18,0,0);document.getElementById("graduation").innerHTML="<h1>"+n.days+"</h1><h3>days until Graduation</h3>";t=setTimeout(function(){display()},500)};display();