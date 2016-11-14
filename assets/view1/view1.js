'use strict';

angular.module('myApp.view1', ['ngRoute','smart-table'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showpatients', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','$uibModal',function($scope,$http,$uibModal) {
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


   $scope.open = function (row) {
       //console.log($scope.displayedCollection);
       //console.log($scope.rowCollection);
       //setTimeout(function(){ $scope.rowCollection[1].isSelected = !$scope.rowCollection[1].isSelected;},1000);
       
       
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/view1/otherdetails.html',
      controller: 'otherdetailsModal',
      size: 'sm',
      resolve: {
        row: row
      }
    });

    modalInstance.result.then(function (selectedItem) {
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }







}])

.controller('otherdetailsModal', function (row, $scope,$uibModalInstance, $uibModal) {
$scope.row = row;

// console.log('hi',row)
 $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }
});