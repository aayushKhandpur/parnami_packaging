customerModule.controller('customerDetailCtrl', function ($scope,$log,$location,customerMgr,customerId) {

	$scope.masterProduct;
	$scope.masterProductId = customerId;
	$scope.customerErrorMsg ='';
  $scope.findView = 'detailView';

  $scope.getCustomer = function (customerId) {
    customerMgr.getCustomerById(customerId,function(customerDetails) {
      $scope.masterProduct = customerDetails.customer;
    });
  }
  $scope.getCustomer($scope.masterProductId);

	$scope.updateCustomer = function( form ) {
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
		}
		var errorMsg = customerMgr.validateCustomer($scope.masterProduct);
		if(errorMsg.length == 0){
			customerMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
				$.toaster({ priority : 'success', title : 'Info', message : 'Customer is Updated',width:'100%'});
				$scope.loadDefaults();
				$scope.applyChanges();
			});
      $scope.go('/index/customers/')
		}else{
			$scope.customerErrorMsg = errorMsg;
		}
	}


	$scope.editCustomer = function() {
		$scope.findView = 'editView';
	}

	$scope.go = function ( path ) {
  	$location.path( path );
	}

});
angular.module('AngularRails').config(['valdrProvider','CONTACT_NUMBER_REGEXP','EMAIL_REGEXP','CONTACT_NUMBER_REGEXP2', function(valdrProvider,CONTACT_NUMBER_REGEXP,EMAIL_REGEXP,CONTACT_NUMBER_REGEXP2) {

  valdrProvider.addConstraints({
    "CustomerUpdate": {
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
