  var apiKey = "f27a663a728568282620c26af630aefb";
  var latitude = 0;
  var longitude = 0;
  var unitSymbol = "C";
  var units = "metric";
  var windSymbol = "knots";
  var weatherDesc = "clear sky";

$(document).ready(function() {

    findUserLocation();

  });

function findUserLocation() {
    // grab user location coords
    var URL = "http://ip-api.com/json";
    $.get(URL, function(data) {
      // if coords, assign to variables and pass to getWeatherData();
      if (data) {
        latitude = data.lat;
        longitude = data.lon;
        console.log("Lat = "+latitude+" lon = "+longitude);
        getWeather();
      } else {
        var error = "There was an error fetching your location, please try again later.";
        alert(error);
      }
    });
  }


function getWeather() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + units, function(data) {
      console.log("https://crossorigin.me/https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + units);
      $("#location-value").html(data.name + ", " + data.sys.country);
      $("#temp-value").html(Math.round(data.main.temp) + unitSymbol);
      $("#wind-value").html(data.wind.speed + ' '+windSymbol);
      $("#hum-value").html(data.main.humidity + "% Humidity");

      console.log("Desc = " + data["weather"][0]["description"]);
      weatherDesc = data["weather"][0]["description"];
      console.log("Weather Desc = " + weatherDesc);
      switch (weatherDesc) {
        case "clear sky":
         $("body").css("background-image", "url('http://cdn.wallpapersafari.com/53/58/iBLTOY.jpg')");
          break;
        case "clouds":
          $("body").css("background-image", "url('https://s25.postimg.org/6l289wrov/cloud_sky.jpg')");
          break;
        case "few clouds":
        case "scattered clouds":
        case "broken clouds":
          $("body").css("background-image", "url('https://s25.postimg.org/kg0isdm3z/partcloudy_sky.jpg')");
          break;
        case "shower rain":
        case "light rain":
        case "rain":
          $("body").css("background-image", "url('https://s25.postimg.org/ku1urz67j/rainy_sky.jpg')");
          break;
        case "snow":
        case "light snow":
          $("body").css("background-image", "url('https://s25.postimg.org/jt1m2up7z/snow_sky.jpg')");
          break;
        case "thunderstorm":
          $("body").css("background-image", "url('https://s25.postimg.org/6q5zjkyzz/thunderstorm_sky.jpg')");
          break;
        default:
           $("body").css("background-image", "url('http://cdn.wallpapersafari.com/53/58/iBLTOY.jpg')");
          break;
          
      }

    });
  }

 
  $("#chgUnits").click(function() {

  console.log("chgUnits was clicked Units = " + units + " UnitSymbol = " + unitSymbol);

  if (units == "metric") {
    units = "imperial";
    unitSymbol = "F";
    $("#chgUnits").html("Metric");
  } else {
    units = "metric";
    unitSymbol = "C";
    $("#chgUnits").html("Farenheit");
  }

  getWeather();

  });