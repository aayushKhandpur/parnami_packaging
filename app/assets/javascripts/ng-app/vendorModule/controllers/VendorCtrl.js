vendorModule.controller('vendorCtrl', function ($scope,$log,$location,vendorMgr) {

	$scope.location;
	$scope.allLocations;
	$scope.locationId = null;
	$scope.showList;
	$scope.findView;
	$scope.vendorErrorMsg ='';


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

	$scope.createVendor = function( form) {
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
			}
		var errorMsg = vendorMgr.validateVendor($scope.location);
		if(errorMsg.length == 0){
			vendorMgr.createLocation($scope.locationId,$scope.location,function(locationDetails) {
				$.toaster({ priority : 'success', title : 'Info', message : 'Vendor is Saved',width:'100%'});
				$scope.loadDefaults();
				$scope.applyChanges();
				$scope.go('/index/vendor/');
			});
		}else{
			$scope.vendorErrorMsg = errorMsg;
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

	$scope.go = function ( path ) {
		$location.path( path );
	};


});

angular.module('AngularRails').config(['valdrProvider','CONTACT_NUMBER_REGEXP','EMAIL_REGEXP','CONTACT_NUMBER_REGEXP2', function(valdrProvider,CONTACT_NUMBER_REGEXP,EMAIL_REGEXP,CONTACT_NUMBER_REGEXP2) {

  valdrProvider.addConstraints({
    "VendorCreate": {
			'mobileNumber': {
				'required': {
					'message': 'Mobile number is required'
				},
				"pattern": {
	         "value": CONTACT_NUMBER_REGEXP,
	         "message": "Mobile number is not valid"
	      }
			},
      "name": {
        "required": {
          "message": "Name is required"
        }
      },
			"billingName": {
        "required": {
					"message": "Billing name is required"
				}
			},
			"landline": {
				"pattern": {
					"value": CONTACT_NUMBER_REGEXP2,
					"message": "Landline number is not valid"
				}
			},
			"alternateNumber": {
				"pattern": {
					"value": CONTACT_NUMBER_REGEXP2,
					"message": "Phone number is not valid"
				}
			},
			"officeNumber": {
				"pattern": {
					"value": CONTACT_NUMBER_REGEXP2,
					"message": "Office number is not valid"
				}
			},
			"email": {
				"pattern": {
					"value": EMAIL_REGEXP,
					"message": "Email is not valid"
				}
			}

    }
  });
}]);
