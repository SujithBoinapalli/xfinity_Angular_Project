var xfinityApp = angular.module('xfinityApp', []);
xfinityApp.controller('xfinityController', ['$scope', 'apiService', function($scope, apiService) {
	
  var xfinityData = [];
  
  //Code to get all categories(C1, C2, C3)
  var getAllCategories = function(collection){
    var allCategories = [{ id: "name", name: "Name"}];
    _.each(collection, function(item){
      var itemFound = _.find(allCategories, function(categoryItem){
        return categoryItem.id.toLowerCase() === item.category.toLowerCase();
      });
      
      if(!itemFound)
        allCategories.push({ id: item.category, name: item.category })
    });
    return allCategories;
  };
  
  //Code to display all available categories(C1, C2, C3)
   var getAllCategoryKeys = function(allCategories){
    var keys = [];
    _.each(allCategories, function(category, index){
      if(index !== 0){
        keys.push(category.id.toLowerCase());
      }
    });
    return keys;
  };
    
  //Code for get list(amount) based on categories(C1, C2, C3)	
  var getListBasedOnCategories = function(collection){
    var categoryWiseList = [];
    _.each(collection, function(item){
      var itemAlreadyInTheList = _.find(categoryWiseList, function(category){
          return category.name.toLowerCase() === item.name.toLowerCase();
      });
      if(!itemAlreadyInTheList){
        var itemFound = {};
        itemFound.name = item.name;
        _.each($scope.allCategoryKeys, function(category, index){
          itemFound[category] = "-";
        });
        itemFound[item.category.toLowerCase()] = item.amount;
        categoryWiseList.push(itemFound);
      } else {
        if(item.category)
          itemAlreadyInTheList[item.category.toLowerCase()] = item.amount;
      }
    });
    return categoryWiseList;
  }; 
  
  //Loading the data from JSON file
  $scope.loadGrid = function(){
      var promise = apiService.getData('data.json', 'GET', null, null);      
      promise.then(function(data)
      {
        $scope.xfinityData = data.collection;
		$scope.allCategories = getAllCategories($scope.xfinityData);
		$scope.allCategoryKeys = getAllCategoryKeys($scope.allCategories);
		$scope.categoryWiseList = getListBasedOnCategories($scope.xfinityData);
		
      }, function(error)
      {
		  $scope.xfinityData = [
				{
								"name":	"a1",
								"category":	"C1",
								"amount":	10
				},
				{
								"name":	"a3",
								"category":	"C1",
								"amount":	30
				},
				{
								"name":	"a2",
								"category":	"C1",
								"amount":	20
				},
				{
								"name":	"a1",
								"category":	"C2",
								"amount":	100
				},
				{
								"name":	"a6",
								"category":	"C2",
								"amount":	600
				},
				{
								"name":	"a2",
								"category":	"C2",
								"amount":	200
				},
				{
								"name":	"a5",
								"category":	"C2",
								"amount":	500
				},
				{
								"name":	"a1",
								"category":	"C3",
								"amount":	1000
				},
				{
								"name":	"a3",
								"category":	"C3",
								"amount":	3000
				},
				{
								"name":	"a5",
								"category":	"C3",
								"amount":	5000
				}
				];
        console.log("Error Occured during service request");
		$scope.allCategories = getAllCategories($scope.xfinityData);
		$scope.allCategoryKeys = getAllCategoryKeys($scope.allCategories);
		$scope.categoryWiseList = getListBasedOnCategories($scope.xfinityData);
      });
    };	
	
	//Code for sorting on click table headers
	$scope.propertyName = 'amount';
    $scope.reverse = false;
    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
      $scope.propertyName = propertyName;
    };
	$scope.loadGrid();
}]);



