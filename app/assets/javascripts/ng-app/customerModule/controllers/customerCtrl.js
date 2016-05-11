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

	$scope.createCustomer = function() {
		var errorMsg = customerMgr.validateCustomer($scope.masterProduct);
		if(errorMsg.length == 0){
			customerMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
				$.toaster({ priority : 'success', title : 'Info', message : 'Customer is Saved',width:'100%'});
				$scope.loadDefaults();
				console.log(JSON.stringify(masterProductDetails));
				$scope.applyChanges();
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

});
