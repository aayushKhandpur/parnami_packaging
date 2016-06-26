locationModule.controller('locationDetailsCtrl', function ($scope,$log,$location,locationMgr,$stateParams,locationId) {

	$scope.location;
	$scope.locationId = locationId;
	$scope.findView = 'detailView';

	$scope.getAllLocations = function() {
		$scope.allLocations = [];
		locationMgr.getLocations(function(locations){
			$.each(locations,function(k,v) {
				$scope.allLocations.push(v.location);
			});
		});
	}
	$scope.getAllLocations();

  $scope.getLocation = function (locationId) {
    locationMgr.getLocationById(locationId,function(locationDetails) {
      $scope.location = locationDetails;
    });
  }
  $scope.getLocation($scope.locationId);

  $scope.editLocation = function(){
    $scope.findView = 'editView';
  }

  $scope.updateLocation = function( form ){
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
					$.toaster({ priority : 'success', title : 'Info', message : 'Location is updated',width:'100%'});
					$scope.loadDefaults();
					console.log(JSON.stringify(locationDetails));
					$scope.applyChanges();
					$scope.go('index/locations/');
				});
			}
  }

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
