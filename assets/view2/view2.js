'use strict';

angular.module('myApp.view2', ['ngRoute','cleave.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/newpatient', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope',function($scope) {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "active";
    $scope.party = {}
    
    
    $scope.party.gender = 'Not Selected';
}]);