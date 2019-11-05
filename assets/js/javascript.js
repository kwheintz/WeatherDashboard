// GLOBAL VARIABLES
var apiKey = "0d8e5cef9f1f9a5bc040c48374da619f";
var pastSearches = [];


// function displayWeather() {
    
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "London" + "&appid=" + apiKey;
   
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         var temperature = response.main.temp;
//         console.log(response.main.temp);
//     });
// }

function renderHistory() {
    $("#searchHistory").empty();
    for(i=0; i<pastSearches.length; i++) {
        var historyButton = $("<button>");
        historyButton.addClass("history-button");
        historyButton.attr("data-name", pastSearches[i]);
        historyButton.text(pastSearches[i]);
        $("#searchHistory").append(historyButton);
    }
}

$("#citySearch").on("click", function() {
    event.preventDefault();
    $("#searchHistory").empty();
    var citySearch = $("#cityName").val().trim();
    console.log(citySearch);
    pastSearches.push(citySearch);
    renderHistory();
});

//$(document).on("click", "#data-name", displayWeather);
