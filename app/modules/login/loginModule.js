/*==========================================================
    Author      : Jitendra kumar 
    Date Created: 08 may 2017
    Description : Base for Login module
    
    Change Log
    s.no      date    author     description     
    

 ===========================================================*/

var login = angular.module('login', ['ui.router', 'ngResource', 'ngAnimate','ngStorage','ngCookies']);

// login.config(['$locationProvider', function AppConfig($locationProvider) {
//             $locationProvider.html5Mode({enabled: true}).hashPrefix('*');
//         }]);

login.config(["$stateProvider", function ($stateProvider) {

    //login page state
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/modules/login/login.html',
        controller: 'loginCtrl',       
        data: {
            pageTitle: 'Login'
        }
    })
    .state('logout',{
        url:'/logout',
        controller:'logoutCtrl'
    });

}]);


