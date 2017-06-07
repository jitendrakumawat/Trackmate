angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.myForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
angular.module('app').controller('passwordResetCtrl',function($scope,$http,$stateParams){

	$scope.errmsg="";
    $scope.param=$stateParams.resetKey; 
    $scope.submit=function(){
	// validate the modify user form
    if ($scope.myForm.password.$error.required || !$scope.myForm.password.$dirty) {
        $scope.myForm.password.$touched = true;
        return;
    }           
    $scope.conerror = "";
    $scope.moderror = "";
    $scope.modSuccess = false;
    $http({
        method : "PUT",
        url : "http://trackmateproject.herokuapp.com/ConfirmPassword"+ '/' +$scope.param +'/',
        data : {"password" : $scope.password},
        headers : {
            "Content-Type" : "application/json"
            }
        }).then(function successCallback(response) {
            alert("success");
            $scope.password = "";
            $scope.password_c = "";
            $scope.myForm.password.$touched = false;
            $scope.myForm.password_c.$touched = false;
            $scope.modSuccess = true;
        }, function errorCallback(response) {
            if (response.status == 400) {
                $scope.moderror = response.data.error;
                $scope.myForm.$setPristine();
            } 
            else {
                if (response.status == 403)
                    $scope.conerror="user authentication failed";
                else {
                    $scope.conerror = "Error trying to reset the password. Retry.";
                            
                  }
            }
        });

    };

});