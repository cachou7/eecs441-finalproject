var map;
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

$(document).ready(function(){
  $("#southu-map").click(function(){
    var coords = [42.2747, -83.7339]
    var southULatLng = new google.maps.LatLng(coords[0], coords[1]);
    map.setZoom(18)
    map.panTo(southULatLng)
  })
});

$(document).ready(function(){
  $("#main-map").click(function(){
    var coords = [42.2805, -83.748344]
    var mainLatLng = new google.maps.LatLng(coords[0], coords[1]);
    map.setZoom(16.5)
    map.panTo(mainLatLng)
  })
});

$(document).ready(function(){
  $("#kerrytown-map").click(function(){
    var coords = [42.286, -83.7468]
    var kerryLatLng = new google.maps.LatLng(coords[0], coords[1]);
    map.setZoom(16.25)
    map.panTo(kerryLatLng)
  })
});

var app = angular.module('h2a2', []);

app.controller('scrollerController', [ '$scope', '$http', function($scope, $location, $anchorScroll){
  $scope.move = function($event){
    $event.preventDefault();
    $('html,body').animate({
      scrollTop: $("#southu").offset().top},
      'slow');
  };
}]);

app.controller('southUbarInfo',[ '$scope', '$http', function($scope, $http) {
  var d = new Date();
  $scope.dayOfWeek = d.getDay();

  $scope.southUbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('eecs493-finalproject/config.json').then(function(response) {
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
  $http.get('eecs493-finalproject/config.json').then(function(response) {
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
  $http.get('eecs493-finalproject/config.json').then(function(response) {
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

  $("#" + days[$scope.dayOfWeek]).addClass("btn-warning");
  $("#" + days[$scope.dayOfWeek]).removeClass("btn-dark");

  $scope.dayHead = "Today's Deals"

  $scope.southUbarResults = {};

  $scope.mainStbarResults = {};

  $scope.kerrytownbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('eecs493-finalproject/config.json').then(function(response) {
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
    $("div.btn-group").find(".btn-warning").addClass("btn-dark");
    $("div.btn-group").find(".btn-warning").removeClass("btn-warning");
    $(this).addClass("btn-warning");
    $(this).removeClass("btn-dark");
  });  
});

app.controller('mapInfo',[ '$scope', '$http', function($scope, $http) {
  // $scope.locations = {};

  // $scope.init = function(){

  //   //Get day of week
  //   var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  //   var dates = new Date();
  //   var day = dates.getDate();
  //   var month = months[dates.getMonth()];
  //   var year = dates.getFullYear();
  //   var today = new Date(month + ' ' + day + ', ' + year);
  //   var DoW = today.getDay();

  //   //Map only allows a certian amount of requests...so limit to these restaurants
  //   var inRestaurants = [];

  //   //Get locations
  //   $http.get('http://localhost:8000/config.json').then(function(response) {
  //     var locations = response.data.slice();
  //     var count = 0;
  //     for (index in locations){
  //       for (area in locations[index]){
  //         for (i in locations[index][area]){
  //           if (locations[index][area][i].day_arr[DoW])
  //             inRestaurants.push(count);
  //           count++;
  //         }
  //       }
  //     }
  //     var rands = [];
  //     var prevCount = count;
  //     for (var i = 0; i < prevCount-10; i++){
  //       inRestaurants.splice((Math.floor(Math.random()*(count+1))),1);
  //       count--;
  //     }
  //     var interation = 0;
  //     var deals = [];
  //     // The location of UMich campus
  //     var campus = {lat: 42.2780, lng: -83.7382};
  //     // The map, centered at UMich campus
  //     var map = new google.maps.Map(
  //       document.getElementById('map'), {zoom: 14.5, center: campus});
  //     var infowindow = new google.maps.InfoWindow();
  //     var service = new google.maps.places.PlacesService(map);
  //     for (index in locations){
  //       for (area in locations[index]){
  //         for (i in locations[index][area]){
  //           if (inRestaurants.includes(interation)){
  //             var restaurant = locations[index][area][i];
  //             deals[restaurant.placeid] = restaurant.deals[0];
  //               for (var i = 1; i < restaurant.deals.length; i++){
  //                 deals[restaurant.placeid] += ", " + restaurant.deals[i];
  //             }  
  //             service.getDetails({
  //               placeId: restaurant.placeid
  //             }, function(place, status){
  //               if (status === google.maps.places.PlacesServiceStatus.OK) {
  //                 var marker = new google.maps.Marker({
  //                   map: map, 
  //                   position: place.geometry.location
  //                 });
  //                 marker.addListener('click', function(){ 
  //                 hoursArray = place.opening_hours.periods[DoW];

  //                   var openPeriod = "";
  //                   if (hoursArray.open.day === DoW && hoursArray.open.hours < 12)
  //                     openPeriod = "AM";
  //                   else
  //                     openPeriod = "PM";
  //                   var closePeriod = "";
  //                   if (hoursArray.close.day === DoW)
  //                     closePeriod = "PM";
  //                   else
  //                     closePeriod = "AM";

  //                   var openHour = hoursArray.open.time.slice(0, 2)%12 + ':' + hoursArray.open.time.slice(2, 4) + openPeriod;
  //                   var closeHour = hoursArray.close.time.slice(0, 2)%12 + ':' + hoursArray.close.time.slice(2, 4) + closePeriod;
  //                   if (closeHour == "0:00AM")
  //                     closeHour = "12:00AM";
  //                   if (openHour == "0:00PM")
  //                     openHour = "12:00PM";
  //                   var todayHours = openHour + '-' + closeHour;
  //                   console.log(place);
  //                   infowindow.setContent(
  //                     '<div><strong>' + place.name + ' </strong><br>' +
  //                     place.formatted_phone_number + '<br>' + 
  //                     place.website + '<br>' +
  //                     "Today's Hours: " + todayHours + '<br>' + 
  //                     "Today's Deals: "  + deals[place.reference] +
  //                     '</div>'
  //                   );
  //                   marker.setAnimation(google.maps.Animation.BOUNCE);
  //                   setTimeout(function(){
  //                     marker.setAnimation(null);
  //                   }, 700);
  //                   infowindow.open(map, marker);
  //                 });
  //               }
  //             })
  //           }
  //           interation++;
  //         }
  //       }
  //     }    
  //   });  
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

    //Get locations
    $http.get('eecs493-finalproject/config.json').then(function(response) {
      var locations = response.data.slice();
      var locPairs = [[0, "southU"],[1, "main"],[2,"kerrytown"]]

      // The location of UMich campus
      var campus = {lat: 42.28, lng: -83.74};
      // The map, centered at UMich campus
      map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14.5, center: campus});
      var infowindow = new google.maps.InfoWindow({
        maxWidth: 200
      });
      var service = new google.maps.places.PlacesService(map);

       for (var i = 0; i < locPairs.length; ++i){
        var idx = locPairs[i][0]
        var name = locPairs[i][1]
        console.log(locations[idx][name])
        var iconImg = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        if (i == 0) {
          iconImg = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
        else if (i == 2) {
          iconImg = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }
        for (var j = 0; j < locations[idx][name].length; ++j) {
          var restaurant = locations[idx][name][j]
          var myLatlng = new google.maps.LatLng(restaurant.latlng[0], restaurant.latlng[1])
          var myDeals = restaurant.deals[0]
          for (var d = 1; d < restaurant.deals.length; ++d) {
            myDeals += (", " + restaurant.deals[d])
          }
          var marker = new google.maps.Marker({
            map: map, 
            position: myLatlng,
            name: restaurant.full_name,
            phone: restaurant.phone,
            hours: restaurant.hours,
            deals: myDeals,
            website: restaurant.website,
            address: restaurant.address,
            icon: iconImg,
            animation: null
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(
              '<div><strong>' + this.name + ' </strong><br>' +
              '<a href=\"' + this.website + '">Website</a><br><br>' + 
              '<strong>Address: </strong>' + this.address + '<br><strong>Phone: </strong>' + 
              this.phone + '<br>' + "<strong>Today's Happy Hours: </strong>" + this.hours + '<br>' + 
              "<strong>Today's Deals: </strong>"  + this.deals +
              '</div>'
              );
            // Animation bouncing not working
            // this.animation = google.maps.Animation.BOUNCE;
            // setTimeout(function(){
            //   this.animation = null;
            // }, 700);
            // this.animation = null;
            infowindow.open(map, this);
          });
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


