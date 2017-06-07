/*==========================================================
    Author      : Jitendra kumar
    Date Created: 20 May 20177
    Description : main application base
    
    Change Log
    s.no      date    author     description     
    

 ===========================================================*/

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'flash',
    'login','UserValidation', 'dashboard','ngStorage']);

//By default, AngularJS will route URLs with a hashtag.Remove hashtag from URL by setting  HTML5 mode to true.
// app.config(['$locationProvider', function AppConfig($locationProvider) {
//             $locationProvider.html5Mode({enabled: true}).hashPrefix('*');
//         }]);
        

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $modalInstance) {

    //IdleScreenList
    $stateProvider
       .state('app', {
           url: '/app',
           templateUrl: 'app/common/app.html',
           controller: 'appCtrl',
           controllerAs: 'vm',
           data: {
               pageTitle: 'Login'
           }
       })
        .state('passwordReset', {
           url: '/passwordReset/:resetKey',
           templateUrl: 'app/modules/login/passwordReset/passwordReset.html',  
           controller: 'passwordResetCtrl',
           data: {
               pageTitle: 'passwordReset'
           }
       });

    $urlRouterProvider.otherwise('login');

    //$urlRouterProvider.otherwise('app/dashboard');
    //$urlRouterProvider.otherwise('/app/dashboard');
}]);

// set global configuration of application and it can be accessed by injecting appSettings in any modules
app.constant('appSettings', appConfig);

