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

  $scope.mainStbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.mainStbarResults = response.data[1]["main"];
    console.log(response.data);
  });
}]);

app.controller('kerrytownbarInfo',[ '$scope', '$http', function($scope, $http) {

  $scope.kerrytownbarResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.kerrytownbarResults = response.data[2]["kerrytown"];
    console.log(response.data);
  });
}]);