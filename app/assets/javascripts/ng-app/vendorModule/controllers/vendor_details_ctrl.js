vendorModule.controller('vendorDetailsCtrl', function ($scope,$log,$location,vendorMgr,vendorId) {

	$scope.location;
	$scope.allLocations;
	$scope.vendorId = vendorId;
	$scope.findView = 'detailView';
	$scope.vendorErrorMsg ='';

  $scope.getVendor = function (vendorId) {
    vendorMgr.getVendorById(vendorId,function(vendorDetails) {
      $scope.location = vendorDetails;
    });
  }
  $scope.getVendor($scope.vendorId);

  $scope.editVendor = function(){
    $scope.findView = 'editView';
  }

  $scope.updateVendor = function( form ){
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
});


angular.module('AngularRails').config(['valdrProvider','CONTACT_NUMBER_REGEXP','EMAIL_REGEXP','CONTACT_NUMBER_REGEXP2', function(valdrProvider,CONTACT_NUMBER_REGEXP,EMAIL_REGEXP,CONTACT_NUMBER_REGEXP2) {

  valdrProvider.addConstraints({
    "VendorUpdate": {
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
