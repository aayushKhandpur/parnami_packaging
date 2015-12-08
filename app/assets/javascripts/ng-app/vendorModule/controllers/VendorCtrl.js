vendorModule.controller('vendorCtrl', function ($scope,$log,$location,vendorMgr) {

	$scope.location;
	$scope.allLocations;
	$scope.locationId = null;
	$scope.showList;
	$scope.findView;
	
	
	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}
	
	$scope.loadDefaults = function() {
		$scope.allLocations = [];
		$scope.locationId = null;
		$scope.location = {};
		$scope.showList = true;
		$scope.findView = 'none';
		vendorMgr.getLocations(function(locations){
			$.each(locations,function(k,v) {
				$scope.allLocations.push(v.vendor);
			});
			$scope.applyChanges();
		});
	}
	$scope.loadDefaults();
	
	$scope.createVendor = function() {
		console.log(JSON.stringify($scope.masterProduct));
		vendorMgr.createLocation($scope.locationId,$scope.location,function(locationDetails) {
			$.toaster({ priority : 'success', title : 'Info', message : 'Vendor is Saved',width:'100%'});
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
		$scope.locationId = lId;
		$scope.findView = 'showeditandview';
		$scope.showList = false;
	}
	
	$scope.showNewVendor = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithNewVendor';
		$scope.location = {};
	}
	
	$scope.editVendor = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithOldVendor';
	}
	
});