locationModule.controller('locationCtrl', function ($scope,$log,$location,locationMgr) {

	$scope.location;
	$scope.allLocations;
	$scope.locationId = null;
	$scope.findView;
	$scope.showList;
	
	
	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}
	
	$scope.loadDefaults = function() {
		$scope.allLocations = [];
		$scope.locationId = null;
		$scope.location = {};
		$scope.findView = 'none';
		$scope.showList = true;
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
			$.toaster({ priority : 'success', title : 'Info', message : 'Location is Saved',width:'100%'});
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
		$scope.findView = 'showeditandview';
		$scope.showList = false;
		$scope.locationId = lId;
	}
	
	$scope.showNewLocation = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithNewLocation';
		$scope.location = {};
	}
	
	$scope.editLocation = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithOldLocation';
	}
	
});