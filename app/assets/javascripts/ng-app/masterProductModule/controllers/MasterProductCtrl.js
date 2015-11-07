masterProductModule.controller('masterProductCtrl', function ($scope,$log,$location,masterProductMgr) {

	$scope.masterProduct;
	$scope.allMasterProducts;
	$scope.masterProductId = null;
	$scope.isMasterProductShown;
	
	
	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}
	
	$scope.loadDefaults = function() {
		$scope.allMasterProducts = [];
		$scope.masterProductId = null;
		$scope.masterProduct = {};
		$scope.isMasterProductShown = false;
		masterProductMgr.getMasterProducts(function(masterProducts){
			$.each(masterProducts,function(k,v) {
				$scope.allMasterProducts.push(v.master_product);
			});
			$scope.applyChanges();
		});
	}
	$scope.loadDefaults();
	
	$scope.createMasterProduct = function() {
		masterProductMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
			alert('Master Product is saved...!!');
			$scope.loadDefaults();
			console.log(JSON.stringify(masterProductDetails));
			$scope.applyChanges();
		});
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
		$scope.isMasterProductShown = true;
		$scope.masterProductId = pId;
	}
	
});