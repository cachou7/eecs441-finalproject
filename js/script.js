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

