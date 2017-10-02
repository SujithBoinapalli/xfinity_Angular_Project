var xfinityApp = angular.module('xfinityApp');
//Service(apiService) to retrieve the data from specified location used across application
xfinityApp.service('apiService', ['$http', '$q', function($http, $q) { 
	var getHttpConfig = function(url, method, params, data, tracker){
    var config = {
            url: url,
            method: method,
            data: data,
            params: params
          };
    return config;
  };
  
  this.getData = function(url, method, params, data, tracker){
    
    var httpConfig = getHttpConfig(url, method, params, data, tracker);
    var deffered = $q.defer();
    $http(httpConfig).success(function (data) 
    {
      deffered.resolve(data);
    }).error(function (error) 
    {
        deffered.reject(error);
    });    
    return deffered.promise;
  };
}]);

