// Smooth scrolling
$(document).ready(function(){
  $(".navbar a").click(function(){
    $("body,html").animate({
      scrollTop:$("#" + $(this).data('value')).offset().top
    },1000)
  })
});

$(document).ready(function(){
  $("#header-navbar a").click(function(){
    $("body,html").animate({
      scrollTop:$("#" + $(this).data('value')).offset().top
    },1000)
  })
});

var app = angular.module('h2a2', []);

app.controller('southUbarInfo',[ '$scope', '$http', function($scope, $http) {
  var d = new Date();
  $scope.dayOfWeek = d.getDay();

  $scope.southUbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.southUbarResults = response.data[0]["southU"];
    console.log(response.data);
  });
}]);

app.controller('mainStbarInfo',[ '$scope', '$http', function($scope, $http) {
  var d = new Date();
  $scope.dayOfWeek = d.getDay();
  
  $scope.southUbarResults = {};

  $scope.mainStbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.mainStbarResults = response.data[1]["main"];
    console.log(response.data);
  });
}]);

app.controller('kerrytownbarInfo',[ '$scope', '$http', function($scope, $http) {
  var d = new Date();
  $scope.dayOfWeek = d.getDay();
  
  $scope.southUbarResults = {};

  $scope.kerrytownbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.kerrytownbarResults = response.data[2]["kerrytown"];
    console.log(response.data);
  });
}]);


app.controller('mapInfo',[ '$scope', '$http', function($scope, $http) {
  $scope.locations = {};

	$scope.init = function(){

    //Get day of week
		var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var dates = new Date();
    var day = dates.getDate();
    var month = months[dates.getMonth()];
    var year = dates.getFullYear();
    var today = new Date(month + ' ' + day + ', ' + year);
    var DoW = today.getDay();

    //Map only allows a certian amount of requests...so limit to these restaurants
    var inRestaurants = ["Ashley's", "autbar", "charleys", "blep", "arborbrewingco", "lunchroom", "bluetractor", "brownjug", "garagebar", "Hopcat"];

    //Get locations
    $http.get('http://localhost:8000/config.json').then(function(response) {
      var locations = response.data.slice();

      // The location of UMich campus
      var campus = {lat: 42.2780, lng: -83.7382};
      // The map, centered at UMich campus
      var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14.5, center: campus});
      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      for (index in locations){
        for (area in locations[index]){
          for (i in locations[index][area]){
            var restaurant = locations[index][area][i];
            if (inRestaurants.indexOf(restaurant.name) >= 0){
              service.getDetails({
                placeId: restaurant.placeid
              }, function(place, status){
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  var marker = new google.maps.Marker({
                    map: map, 
                    position: place.geometry.location
                  });
                  marker.addListener('click', function(){
                    hoursArray = place.opening_hours.periods[DoW];

                    var openPeriod = "";
                    if (hoursArray.open.day === DoW && hoursArray.open.hours < 12)
                      openPeriod = "AM";
                    else
                      openPeriod = "PM";
                    var closePeriod = "";
                    if (hoursArray.close.day === DoW)
                      closePeriod = "PM";
                    else
                      closePeriod = "AM";

                    var openHour = hoursArray.open.time.slice(0, 2) + ':' + hoursArray.open.time.slice(2, 4) + openPeriod;
                    var closeHour = hoursArray.close.time.slice(0, 2) + ':' + hoursArray.close.time.slice(2, 4) + closePeriod;
                    var todayHours = openHour + '-' + closeHour;
                    infowindow.setContent(
                      '<div><strong>' + place.name + '</strong><br>' +
                      place.formatted_phone_number + '<br>' + 
                      "Today's Hours: " + todayHours + '<br>' + 
                      place.website + 
                      '</div>'
                    );
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function(){
                      marker.setAnimation(null);
                    }, 700);
                    infowindow.open(map, marker);
                  });
                }
              })
            }
          }
        }
      }    
    });       
	}

  $scope.load = function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBfR08tezVdq9huDs5CypaeGeVR7rcUmks&libraries=places';
    document.body.appendChild(script);
    setTimeout(function(){
      $scope.init();
    }, 500);
  }
}]);