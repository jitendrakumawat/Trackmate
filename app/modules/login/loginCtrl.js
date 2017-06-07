/*==========================================================
    Author      : Jitendra Kumar
    Date Created: 10 May 2017
    Description : Controller to handle Login module
    Change Log
    s.no      date    author     description     


 ===========================================================*/

login.controller("loginCtrl",['$scope','$http','$state','$localStorage',function ($scope,$http,$state,$localStorage) {
       
        $scope.login = function () {

            if ($scope.loginForm.username.$error.required || $scope.loginForm.username.$error.email || !($scope.loginForm.username.$dirty || $scope.loginForm.password.$dirty)) {
                    $scope.LoginForm.username.$touched = true;
                    return;
           }

           $http({
                method : "POST",
                url : "http://trackmateproject.herokuapp.com/api-token-auth/",
                data : {"username" : $scope.username,  "password" : $scope.password},
                headers : {

                   "Content-Type" : "application/json"
                    }

                 }).then(function successCallback(response) {
                    console.log(response.data);
                //authenticationService.SetCredentials($scope.userId,response.token);
                // store username and token in local storage to keep user logged in between page refreshe.
                $localStorage.currentUser = {token: response.data};
                
                // add jwt token to auth header for all requests made by the $http service
                 $http.defaults.headers.common.Authorization = 'Token ' + response.token;
                 $scope.username="";
                 $scope.password="";
                 $scope.loginForm.username.$touched = false;
                 //replace the current page with home.html 
                 $state.go('app.dashboard');                  
                     }, function errorCallback(response) {
                         
                            // delete $localStorage.currentUser; 
                            // $http.defaults.headers.common.Authorization ='';
                        if (response.status == 400) {
                            // $scope.moderror = response.data.error;
                            $scope.moderror="Email id or password not valid. Try again";
                          
                        }

                        else {
                            $scope.bConerror = true;
                            $scope.conerror = "Error trying to login. Retry.";
                            $('#conError').modal('show');
                        }
                    });

            
        };

        // password Reset
             $scope.reset  = function(event) {
                event.preventDefault();
               
                // validate the login form
                if ($scope.nf.RuserId.$error.required || $scope.nf.RuserId.$error.email || !$scope.nf.RuserId.$dirty ) {
                    $scope.nf.RuserId.$touched = true;


                }


                $scope.conerror = "";
                $scope.rerror="";
                $scope.bConerror = false;
            
                $http({
                        method : "PUT",
                        url : "http://trackmateproject.herokuapp.com/requestForNewPassword/",
                        data : {"email" : $scope.muserId},
                        headers : {
                            "Content-Type" : "application/json"
                        }
                    }).then(function successCallback(response) {
                        alert("success");
                      
                    }, function errorCallback(response) {
                        alert(response.status);
                        if (response.status == 400) {
                            $scope.rerror = response.data.error;
                            console.log($scope.rerror);
                        } else {
                            $scope.bConerror = true;
                            $scope.conerror = "Error trying to send email. Retry.";
                             console.log($scope.conerror);
                        }
                    });
            };

       

    }]);

