'use strict';

angular.module('myApp.view1', ['ngRoute','smart-table'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showpatients', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http',function($scope,$http) {
    document.getElementById("tabnav").childNodes[1].className = "active";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
$scope.displayedCollection = [];
$scope.rowCollection = [];
$scope.getAge = function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
$http({method:'GET',
      url:'/patient'}) .then(function successCallback(response){
        
        
        $scope.rowCollection = [].concat(response.data); 
        console.log(response);
        //console.log($scope.rowCollection);
        $scope.displayedCollection = [].concat($scope.rowCollection);
        
       },
        function errorCallback(response) {
        console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  }); 




}]);