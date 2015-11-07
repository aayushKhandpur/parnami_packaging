locationModule.controller('locationCtrl', function ($scope,$log,$location,locationMgr) {

	$scope.location;
	$scope.allLocations;
	$scope.locationId = null;
	$scope.isLocationShown;
	
	
	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}
	
	$scope.loadDefaults = function() {
		$scope.allLocations = [];
		$scope.locationId = null;
		$scope.location = {};
		$scope.isLocationShown = false;
		locationMgr.getLocations(function(locations){
			$.each(locations,function(k,v) {
				$scope.allLocations.push(v.location);
			});
			$scope.applyChanges();
		});
	}
	$scope.loadDefaults();
	
	$scope.createLocation = function() {
		locationMgr.createLocation($scope.locationId,$scope.location,function(locationDetails) {
			alert('Location is saved...!!');
			$scope.loadDefaults();
			console.log(JSON.stringify(locationDetails));
			$scope.applyChanges();
		});
	}
	
	$scope.showLocation = function(lId) {
		var location = {};
		for(var counter = 0;counter < $scope.allLocations.length;counter++) {
			if($scope.allLocations[counter].id == lId) {
				location = $scope.allLocations[counter];
				break;
			}
		}
		$scope.location = location;
		$scope.isLocationShown = true;
		$scope.locationId = lId;
	}
	
});