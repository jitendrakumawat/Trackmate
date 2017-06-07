/*==========================================================
    Author      : Jitendra Kumar
    Date Created: 12/04/2017
    Description : Base for Dashboard Application module
    
    Change Log
    s.no      date    author     description     
    
 ===========================================================*/

var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial','angularGeocoder','ngStorage','ngMap']);
 
 //By default, AngularJS will route URLs with a hashtag.Remove hashtag from URL by setting  HTML5 mode to true.
 // dashboard.config(['$locationProvider', function AppConfig($locationProvider) {
 //            $locationProvider.html5Mode({enabled: true}).hashPrefix('*');
 //        }]);

dashboard.config(["$stateProvider",function ($stateProvider) {

    //dashboard home page state
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/dashboard/views/home.html',
        controller: 'liveDataController',
       
        data: {
            pageTitle: 'Home'
        }
     });

    //live data page state
    $stateProvider.state('app.livedata', {
        url: '/livedata',
        templateUrl: 'app/modules/dashboard/views/livedata.html',
        controller: 'liveDataController',
      
        data: {
            pageTitle: 'livedata'
        }
    });

    //Contact page state
    $stateProvider.state('app.contact', {
        url: '/contact',
        templateUrl: 'app/modules/dashboard/views/contact.html',
        controller: 'ContactController',
        
        data: {
            pageTitle: 'Contact Me'
        }
    });

}]);
//To make CORS request  
dashboard.config(function($httpProvider) {
          $httpProvider.defaults.useXDomain = true;
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });
 

// To add Token in header of  each request 
dashboard.run(function($http,$state,$localStorage) {  
        if(typeof ($localStorage.currentUser) !== "undefined"){
            var stringify = JSON.stringify($localStorage.currentUser.token); //change the token object in json string 
            var jsonobject = JSON.parse(stringify); // convert json string in json object so we can seperate key  value
            $http.defaults.headers.common.Authorization = 'Token ' +jsonobject.token; //add token in header for each request

          }
         
    });

