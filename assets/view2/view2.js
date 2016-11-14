'use strict';

angular.module('myApp.view2', ['ngRoute', 'cleave.js'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/newpatient', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

  .controller('View2Ctrl', ['$scope','ngToast','$http', function ($scope,ngToast,$http) {
    $scope.fresh = 1;
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "active";
    $scope.party = {};
    $scope.party.dob = null;
    $scope.datestring = '';
    
    $scope.options = {
           phone: {
            phone: true,
            prefix: '+',
            phoneRegionCode: 'IN'
        },
      date: {
        date: true
      }
    };

   // var cleave = new Cleave($scope.options.phone,"+917790844803");
    //console.log(cleave.getFormattedValue());


    $scope.party.gender = 'Not Selected';

    $scope.setdate = function () {
      if ($scope.datestring.length == 8) {
        $scope.party.dob = new Date($scope.datestring.slice(4, 8), $scope.datestring.slice(2, 4) - 1, $scope.datestring.slice(0, 2));
        $scope.age = getAge($scope.party.dob);
        if($scope.age < 0){
          $scope.age = '';
          $scope.form.dob.$setValidity('future',false);
          $scope.form.dob.$setValidity('type',true);          
          $scope.party.dob = null;
        }
        else{
          $scope.form.dob.$setValidity('type',true);
          $scope.form.dob.$setValidity('future',true);
        }
   
        
      }
      else if($scope.datestring.length == 0) {
          $scope.age = '';
          $scope.party.dob = null;
          $scope.form.dob.$setValidity('type',true);
          $scope.form.dob.$setValidity('future',true);
      }
      else{
        $scope.age = '';
        $scope.party.dob = null;
        //set invalid date
        $scope.form.dob.$setValidity('type',false);
        $scope.form.dob.$setValidity('future',true);
        
      } 
    }

    var getAge = function (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }


    $scope.validatephone = function(){
        $scope.fresh = 0;
       $scope.form.phone.$setDirty(true);
      if ($scope.party.phone != undefined)
      {
      if(($scope.party.phone.length > 7) && ($scope.party.phone.length < 20)){
        $scope.form.phone.$setValidity('length',true);

      }
      else if($scope.party.phone.length == 0){
        $scope.form.phone.$setValidity('length',true);
      }
      else{
        $scope.form.phone.$setValidity('length',false);

      }}
      else{
         $scope.form.phone.$setValidity('length',true);
      }
    }
    $scope.revalidatephone = function(){
      if($scope.fresh == 0)
      {
        $scope.validatephone();
      }
    }

$scope.ok = function(){

  if(!(($scope.party.phone.length > 7) && ($scope.party.phone.length < 20))){
    ngToast.create({
  className: 'warning',
  //content: '<a href="#!/showpatients" class="">Form reset Complete</a>'
  
  content: 'incorrect phone number'
  
});
return;
  }
         
         //var aa = JSON.stringify($scope.order)
         $http({method:'POST',
                url:'/patient/create',
                data: $scope.party }) .then(function successCallback(response){
        
        console.log(response);
             ngToast.create('Patient details saved.');
             $scope.reset(1);
             
    
       },
        function errorCallback(response) {
        console.log(response);
             var er = 'ERROR !!! '+response.statusText+ '  :'+ response.status + '... try again later...'
             
                ngToast.create({
                className: 'danger',
                content: er
                });
             
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  }); 



}
$scope.reset = function(mode){
    $scope.form.dob.$setValidity('type',true);
    $scope.form.dob.$setValidity('future',true);
    $scope.form.phone.$setValidity('length',true);
    $scope.party = {};
    $scope.party.dob = null;
    $scope.party.gender = "Not Selected";
    $scope.datestring = '';
    $scope.age = '';
    document.getElementById("form").reset();
    $scope.form.$setPristine();
    $scope.form.$setUntouched();

  //setTimeout(function(){ document.getElementById("firstname").focus();},100);//10ms find a permant solution
  document.getElementById("firstname").focus();
  //ngToast.create('Form reset Complete');
  if(mode != 1){
  ngToast.create({
  className: 'warning',
  //content: '<a href="#!/showpatients" class="">Form reset Complete</a>'
  
  content: 'Form reset Complete'
  
});

}
}
  }]);