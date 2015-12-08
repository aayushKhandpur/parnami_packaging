masterProductModule.controller('masterProductCtrl', function ($scope,$log,$location,masterProductMgr) {

	$scope.masterProduct;
	$scope.allMasterProducts;
	$scope.masterProductId = null;
	$scope.findView;
	$scope.showList;
	
	
	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}
	
	$scope.loadDefaults = function() {
		$scope.allMasterProducts = [];
		$scope.masterProductId = null;
		$scope.masterProduct = {};
		$scope.findView = 'none';
		$scope.showList = true;
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
			$.toaster({ priority : 'success', title : 'Info', message : 'Master Product is Saved',width:'100%'});
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
		$scope.masterProductId = pId;
		$scope.findView = 'showeditandview';
		$scope.showList = false;
	}
	
	$scope.showNewProduct = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithNewProduct';
		$scope.location = {};
	}
	
	$scope.editProduct = function() {
		$scope.showList = false;
		$scope.findView = 'showSaveWithOldProduct';
	}
	
});