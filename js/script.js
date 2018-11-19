var app = angular.module('h2a2', []);

app.controller('southUbarInfo',[ '$scope', '$http', function($scope, $http) {

  $scope.barResults = {};
  //$scope.barResults = $http.get("../config.json");
  $http.get('http://localhost:8000/config.json').then(function(response) {
    //console.log(response.data);
    $scope.barResults = response.data[0]["southU"];
    console.log($scope.barResults);
  });
}]);