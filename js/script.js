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

  $scope.southUbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.southUbarResults = response.data[0]["southU"];
    console.log(response.data);
  });
}]);

app.controller('mainStbarInfo',[ '$scope', '$http', function($scope, $http) {
  
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

  
  $scope.southUbarResults = {};

  $scope.kerrytownbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.kerrytownbarResults = response.data[2]["kerrytown"];
    console.log(response.data);
  });


  
}]);


var app2 = angular.module('dayPick', []);

app2.controller('allInfo',[ '$scope', '$http', function($scope, $http) {
  var d = new Date();
  $scope.dayOfWeek = d.getDay();

  var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

  $("#" + days[$scope.dayOfWeek]).addClass("btn-primary");
  $("#" + days[$scope.dayOfWeek]).removeClass("btn-dark");

  $scope.dayHead = "Today's Deals"

  $scope.southUbarResults = {};

  $scope.mainStbarResults = {};

  $scope.kerrytownbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.southUbarResults = response.data[0]["southU"];
    $scope.mainStbarResults = response.data[1]["main"];
    $scope.kerrytownbarResults = response.data[2]["kerrytown"];
    console.log(response.data);
  });


  $scope.chooseDay = function(e){
    $scope.dayOfWeek = e;

    if (e == 0){
      $scope.dayHead = "Sunday's Deals"
    }
    if (e == 1){
      $scope.dayHead = "Monday's Deals"
      $scope.mon = true;
    }
    if (e == 2){
      $scope.dayHead = "Tuesday's Deals"
    }
    if (e == 3){
      $scope.dayHead = "Wednesday's Deals"
    }
    if (e == 4){
      $scope.dayHead = "Thursday's Deals"
    }
    if (e == 5){
      $scope.dayHead = "Friday's Deals"
    }
    if (e == 6){
      $scope.dayHead = "Saturday's Deals"
    }
  }
}]);


$(document).ready(function(){
  $("div.btn-group button.btn").click(function(){
    $("div.btn-group").find(".btn-primary").addClass("btn-dark");
    $("div.btn-group").find(".btn-primary").removeClass("btn-primary");
    $(this).addClass("btn-primary");
    $(this).removeClass("btn-dark");
  });  
});

=======
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
>>>>>>> 06d25e888e3bbae9cbad9e83127767c4e256570f
