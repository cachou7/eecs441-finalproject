var app = angular.module('h2a2', []);

app.controller('southUbarInfo',[ '$scope', '$http', function($scope, $http) {
  //$scope.barResults = $http.get("../config.json");
  $http.get('../config.json').then(function(response) {
   $scope.barResults = response.data;
  });
  console.log($scope.barResults);
}]);