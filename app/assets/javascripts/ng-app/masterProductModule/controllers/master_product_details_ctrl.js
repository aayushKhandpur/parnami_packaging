masterProductModule.controller('masterProductDetailsCtrl', function ($scope,$log,$location,masterProductMgr,productId) {

	$scope.masterProduct;
	$scope.allMasterProducts;
	$scope.masterProductId = productId;
	$scope.findView ='detailView';

	$scope.getAllMasterProducts = function() {
		$scope.allMasterProducts = [];
		masterProductMgr.getMasterProducts(function(masterProduct){
			$.each(masterProduct,function(k,v) {
				$scope.allMasterProducts.push(v.master_product);
			});
		});
	}
	$scope.getAllMasterProducts();

	$scope.getMasterProduct = function (productId) {
		masterProductMgr.getMasterProductById(productId,function(processDetails) {
			$scope.masterProduct = processDetails.master_product;
		});
	}
	$scope.getMasterProduct($scope.masterProductId);

	$scope.editProduct = function(){
		$scope.findView = 'editView';
	}

	$scope.updateMasterProduct = function( form ){
		var validated = true;
		if(form.$invalid){
				$scope.formSubmitted=true;
				return;
			}
		$scope.errorMsg = '';

		if($scope.allMasterProducts.length != 0){
				angular.forEach($scope.allMasterProducts,function(listItem){
					if (listItem.name.toLowerCase() === $scope.masterProduct.name.toLowerCase()){
						if(listItem.description != null && $scope.masterProduct.description != null){
							if(listItem.description.toLowerCase() === $scope.masterProduct.description.toLowerCase()){
								$scope.errorMsg = "Product name already taken";
								validated = false;
								return;
							}
						}
					}
				});
			}
			if(validated){
				masterProductMgr.createMasterProduct($scope.masterProductId,$scope.masterProduct,function(masterProductDetails) {
					$.toaster({ priority : 'success', title : 'Info', message : 'Master Product is Updated',width:'100%'});
					$scope.loadDefaults();
					$scope.applyChanges();
					$scope.go('/index/product/')
				});
			}
	}

	$scope.go = function ( path ) {
		$location.path( path );
	};



});


angular.module('AngularRails').config(['valdrProvider', function(valdrProvider) {

  valdrProvider.addConstraints({
    "ProductUpdate": {
      "name": {
        "required": {
          "message": "Name is required"
        }
      }
    }
  });
}]);
