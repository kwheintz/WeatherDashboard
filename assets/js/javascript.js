// GLOBAL VARIABLES
var apiKey = "0d8e5cef9f1f9a5bc040c48374da619f";
var pastSearches = [];


$("#final-result").hide();
$("#fiveday-result").hide();
$("#history-side").hide();
$("#citySearch").on("click", function() {
    runSearch();
});

function runSearch() {
    event.preventDefault();
    $("#final-result").show();
    $("#fiveday-result").show();
    $("#history-side").show();
    var searchTerm = $("#cityName").val().trim();
    var queryURLcity = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=" + apiKey;
    var queryURLfiveday = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=imperial&appid=" + apiKey;
    var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey;
    var resultLon;
    var resultLat;
    
    $.ajax({
        url: queryURLcity,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#weather-info").empty();
        var displayTemp = response.main.temp;
        var displayHumid = response.main.humidity;
        var displayWind = response.wind.speed;
        resultLon = response.coord.lon; 
        resultLat = response.coord.lat;
        pastSearches.push(searchTerm);
        renderHistory();
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth()+1;
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();
        var currentDisplay = currentMonth + "/" + currentDay + "/" + currentYear;
        $("#cityhead").text(response.name + " (" + currentDisplay + ")");
        var iconCode = response.weather[0].icon;
        var displayIcon = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        console.log(displayIcon);
        $("#weather-icon").attr("src", displayIcon);
        $("#weather-info").append("Temperature: " + displayTemp + " °F" + "<br>" + "<br>");
        $("#weather-info").append("Humidity: " + displayHumid + "%" + "<br>" + "<br>");
        $("#weather-info").append("Wind Speed: " + displayWind + " MPH" + "<br>" +"<br>");
        $.ajax({
            url: queryURLuv.concat("&lat=",resultLat,"&lon=",resultLon),
            method: "GET"
        }).then(function(response) {
            $("#weather-info").append("UV Index: " + response.value);
        });
    });
    $.ajax({
        url:queryURLfiveday,
        method:"GET"
    }).then(function(response) {
        console.log(response);
        $("#five-day").empty();
        $("#five-day-title").empty();
        $("#five-day-title").append("Five-Day Forecast");
        for (i=5; i<38; i+=8) {
            var fiveDay = $("<li>");
            fiveDay.addClass("list-inline-item rounded");
            var dateDisplay = response.list[i].dt_txt;
            dateDisplay = dateDisplay.split(" ");
            dateDisplay = dateDisplay[0].split("-");
            fiveDay.attr("id", "five-display");
            fiveDay.append(dateDisplay[1] + "/" + dateDisplay[2] + "/" + dateDisplay[0] + "<hr>");
            var fiveDayIcon = "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png";
            var fiveDayImg = $("<img>");
            fiveDayImg.attr("src", fiveDayIcon);
            fiveDay.append(fiveDayImg);
            fiveDay.append("<br>" + "<br>" + "Temp: " + response.list[i].main.temp + " °F" + "<br>");
            fiveDay.append("Humidity: " + response.list[i].main.humidity + "%" + "<br>");
            $("#five-day").append(fiveDay);
        }
        $("#five-day").append("<br>");
    });
}

function renderHistory() {
    $("#searchHistory").empty();
    for(i=0; i<pastSearches.length; i++) {
        var buttonList = $("<div>");
        var historyButton = $("<button>");
        historyButton.addClass("history-button btn-primary");
        historyButton.attr("data-name", pastSearches[i]);
        historyButton.text(pastSearches[i]);
        $(buttonList).append(historyButton);
        $("#searchHistory").prepend("<hr>");
        $("#searchHistory").prepend(buttonList);   
    }
    $(".history-button").on("click", function() {
        console.log(newSearch);
        $("#cityName").empty();
        $("#cityName").text(newSearch);
        runSearch();
    });
}
