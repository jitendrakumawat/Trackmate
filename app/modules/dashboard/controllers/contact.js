/*==========================================================
    Author      : Jitendra Kumar
    Date Created: 02 may 2017
    Description : Controller to handle Contact page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("ContactController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http) {
    $scope.conerr="";
    $scope.successmsg="";
    // Submit query of customer and show a message that support team will contact you soon
    $scope.submit=function(){
    // validate the add user form
        if ($scope.contactForm.email.$error.required || $scope.contactForm.email.$error.email ) {
            $scope.contactForm.email.$touched = true;
            return;
        }
        if ($scope.contactForm.phone.$error.required || $scope.contactForm.phone.$error.number) {
            $scope.contactForm.phone.$touched = true;
            return;
        }
        if ($scope.contactForm.message.$error.required || $scope.contactForm.message.$error.text) {
            $scope.contactForm.message.$touched = true;
            return;
        }
    
        $http({
            method:"POST",
            url:"",
            data:{"name":$scope.name,"email":$scope.email,"phone":$scope.phone,"message":$scope.message},
            headers:{
                    "Content-Type":"application/json"
            }
            }).then(function successCallback(response){
                $scope.successmsg="Your request has beeb sent to support team,They will contact you soon";
                $scope.name="";
                $scope.email="";
                $scope.phone="";
                $scope.message="";
            }, function errorCallback(response) {
               
           if (response.status == 400) {
              $scope.moderror="data not valid. Try again";
                }

            else {
              
                $scope.conerror = "Error trying to submit query. Retry.";
               
            }
        });
     };       
}]);

