productModule.controller('productCtrl', function ($scope,$log,$location,utilitySrv,$stateParams,productMgr) {
        
		$scope.productName;
		$scope.product = {};
		$scope.productId = $stateParams.productId;
		$scope.orderId = $stateParams.orderId;
		$scope.currentProduct = null;
		$scope.isProductShown = false;
		$scope.productPlanList = [];
		
		$scope.loadDefaults = function() {
			if($scope.productId == 'new')
				return;
			else {
				productMgr.loadDefaults($scope.productId,function(productDetails){
					$scope.product = productDetails.order_product;
					$scope.productName = productDetails.productName;
					$scope.productPlanList = productDetails.productPlanList;
					$scope.isProductShown = true;
					$scope.applyChanges();
				});
			}
		}
		
		$scope.loadDefaults();
		
		$scope.createProduct = function() {
			productMgr.validateProductName($scope.productName,function(masterProductDetails){
				if(masterProductDetails.length == 0) {
					alert('No such Product exists...');
				}
				else {
					$scope.product.master_product_id = masterProductDetails[0].id;
					productMgr.createProduct($scope.product,$scope.productId,$scope.orderId,function(productInserted){
						$scope.productId = productInserted.order_product.id;
						$scope.isProductShown = true;
						$scope.applyChanges();
						alert('Your Product is Saved...!!!');
						$location.path('/orderproducts/'+$scope.orderId+'/'+$scope.productId);
					});
				}
			});
		}
		
		$scope.editProduct = function() {
			$scope.isProductShown = false;
		}
		
		$scope.applyChanges = function()
	    {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }
		
		$scope.navigateToProductPlan = function() {
			$location.path('/productprocessplan/'+$scope.orderId+'/'+$scope.productId+'/new');
		}
		
    });