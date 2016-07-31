customerModule.controller('customerCtrl', function ($scope,$log,$location,customerMgr) {

	$scope.masterProduct;
	$scope.allMasterProducts;
	$scope.masterProductId = null;
	$scope.showList;
	$scope.findView;
	$scope.customerErrorMsg ='';


	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}

	$scope.loadDefaults = function() {
		$scope.allMasterProducts = [];
		$scope.masterProductId = null;
		$scope.masterProduct = {};
		$scope.showList = true;
		$scope.findView = 'none';
		customerMgr.getMasterProducts(function(masterProducts){
			$.each(masterProducts,function(k,v) {
				$scope.allMasterProducts.push(v.customer);
			});
			$scope.applyChanges();
		});
	}
	$scope.loadDefaults();

	$scope.createCustomer = function(form) {
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
		}
		var errorMsg = customerMgr.validateCustomer($scope.masterProduct);
		if(errorMsg.length == 0){
			customerMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
				$.toaster({ priority : 'success', title : 'Info', message : 'Customer is Saved',width:'100%'});
				$scope.loadDefaults();
				$scope.applyChanges();
				$scope.go('/index/customers/')
			});
		}else{
			$scope.customerErrorMsg = errorMsg;
		}


	}

	$scope.showMasterProduct = function(pId) {
		var masterProduct = {};
		for(var counter = 0;counter < $scope.allMasterProducts.length;counter++) {
			if($scope.allMasterProducts[counter].id == pId) {
				masterProduct = $scope.allMasterProducts[counter];
				break;
			}
		}
		$scope.masterProduct = masterProduct;
		$scope.masterProductId = pId;
		$scope.showList = false;
		$scope.findView = 'showeditandview';
		var path = '/index/customers/' + pId ;
		$location.path(path);
	}

	$scope.showNewCustomer = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithNewCustomer';
		$scope.location = {};
	}

	$scope.editCustomer = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithOldCustomer';
	}

	$scope.go = function ( path ) {
  	$location.path( path );
	}

});

angular.module('AngularRails').config(['valdrProvider','CONTACT_NUMBER_REGEXP','EMAIL_REGEXP','CONTACT_NUMBER_REGEXP2', function(valdrProvider,CONTACT_NUMBER_REGEXP,EMAIL_REGEXP,CONTACT_NUMBER_REGEXP2) {

  valdrProvider.addConstraints({
    "CustomerCreate": {
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
