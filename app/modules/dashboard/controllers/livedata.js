/*==========================================================
    Author      : Jitendra Kumar
    Date Created: 22 may 2017
    Description : Controller to handle GPS Data from  server.
    Change Log
    s.no      date    author     description     


 ===========================================================*/

 // Controller to handle user GPS data. 
dashboard.controller("liveDataController", ['$rootScope','$scope','$interval','dashboardService','NgMap','dataSrv'
,function ($rootScope,$scope,$interval, dashboardService,NgMap,dataSrv) {
    
    NgMap.getMap().then(function(map) {
     $scope.map = map;
    });
      
    $scope.tabledata = {};
    $scope.tabledata.data=[];
    $scope.home={};
    $scope.userDetails={};
    $scope.userDetails.data={};
    $scope.TotalVehicle=0;
    $scope.vehicleCount="";
    $scope.vehicledatas={};

    // Method to get data after 10 Second, 
    $interval($scope.getdata=function() {
        dataSrv.gettabledata().then(function successCallback(response) {
        $scope.tabledata = response.data; 
        //$scope.getvehicledata=$scope.tabledata.data[0]; 
      }, function errorCallback(response) {
        if (response.status == 400) {
           //do nothing
        } 
        else 
          if (response.status == 403)
              $scope.showForbiddenPage();
          else{
            $scope.conerror = "Error getting data from server.";
            console.log($scope.conerror);
        }
      });      
    }, 10000);
      
    $scope.userDetail=function(){
      dataSrv.gettabledata().then(function successCallback(response) {
      $scope.userDetails = response.data;
      $scope.TotalVehicle=$scope.userDetails.data.length;
      }, function errorCallback(response) {
        if (response.status == 400) {
        //do nothing
        } 
        else if (response.status == 403)
            $scope.showForbiddenPage();
          else {
            $scope.conerror = "Error refreshing the list of groups in which the user is a member. Retry.";
            console.log($scope.conerror);
           }
      });
    };

    //Set watch to update number of vehicle so that it can update you view when the variable value changes 
    $scope.$watch('TotalVehicle',function(){
             $scope.vehicleCount= $scope.TotalVehicle;
              
      });
  
    // method to open info window when click on marker icon on map.
    $scope.showDetails=function(event,vehicledata){
      $scope.vehicledatas=vehicledata;
      $scope.map.showInfoWindow('info_window',vehicledata.vehicle_no);
    };
     
    // method to close opened info window on map,
    $scope.hideDetails=function(event){
      $scope.map.hideInfoWindow('info_window');
     };
    
    $scope.getdata();
    $scope.userDetail();
   
  
}]);

