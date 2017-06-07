
 // Service to get data from service.This service is a container of user data.Need to inject in a controller where we want to use.
dashboard.service('dataSrv',['$http','$q',function($http,$q){
    this.gettabledata = function () {
    var  deferred = $q.defer();
    return $http({
            method : "GET",
            url: "http://trackmateproject.herokuapp.com/vehicleGpsDataList/",
            headers : {
                "Content-Type" : "application/json"
            }
          }).then(function (response) {
            deferred.resolve(response);
            return deferred.promise;
            }, function (response) {
            deferred.reject(response);
            return deferred.promise;
          });
        };
    }]);