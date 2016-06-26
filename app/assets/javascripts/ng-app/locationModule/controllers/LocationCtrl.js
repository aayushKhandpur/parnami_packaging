locationModule.controller('locationCtrl', function ($scope,$log,$location,locationMgr) {

	$scope.location;
	$scope.allLocations;
	$scope.locationId = null;
	$scope.findView = 'detailView';
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

	$scope.createLocation = function(form) {
		var validated = true;
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
			}
		$scope.errorMsg = '';

		if($scope.allLocations.length != 0){
				angular.forEach($scope.allLocations,function(listItem){
					if (listItem.name.toLowerCase() === $scope.location.name.toLowerCase()){
						$scope.errorMsg = "Location name already taken";
						validated = false;
						return;
					}
				});
			}

			if(validated){
				locationMgr.createLocation($scope.locationId,$scope.location,function(locationDetails) {
					$.toaster({ priority : 'success', title : 'Info', message : 'Location is Saved',width:'100%'});
					$scope.loadDefaults();
					$scope.applyChanges();
					$scope.go('index/locations/');
				});
			}

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
		$scope.go('/index/locations/create')
	}

	$scope.deleteLocation = function(locationId){
		locationMgr.deleteLocation(locationId,function() {
			$.toaster({ priority : 'success', title : 'Info', message : 'Location is Deleted',width:'100%'});
			$scope.loadDefaults();

			$scope.applyChanges();
		});
	}

	$scope.go = function ( path ) {
  	$location.path( path );
	};

});

angular.module('AngularRails').config(['valdrProvider', function(valdrProvider) {

  valdrProvider.addConstraints({
    "LocationUpdate": {
      "name": {
        "required": {
          "message": "Name is required"
        }
      }
    }
  });
}]);
