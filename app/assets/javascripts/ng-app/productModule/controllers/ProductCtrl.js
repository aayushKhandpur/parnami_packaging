productModule.controller('productCtrl', function ($scope,$log,$location,utilitySrv,$stateParams,productMgr,$state) {

		$scope.productName;
		$scope.product = {};
		$scope.productId = $stateParams.productId;
		$scope.orderId = $stateParams.orderId;
		$scope.currentProduct = null;
		$scope.isProductShown;
		$scope.productPlanList = [];
		$scope.allMasterProducts;
		$scope.masterProductId;
		$scope.productErrorMsg;
		$scope.price_type = 'N/A';
		$scope.lamination_type = 'Matt';
		$scope.showPrice = false;
		$scope.showLaminationType = false;


		$scope.applyChanges = function()
	    {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }

		$scope.loadDefaults = function() {
		console.log($scope.productId);
				productMgr.getMasterProducts(function(data){
					console.log(JSON.stringify(data));
					$scope.product = {};
					$scope.isProductShown = false;
					$scope.allMasterProducts = [];
					$.each(data,function(k,v){
						$scope.allMasterProducts.push(v.master_product);
					});
					$scope.masterProductId = $scope.allMasterProducts[0].id;
					$scope.productName = $scope.allMasterProducts[0].name;
					console.log($scope.productName);
					if($scope.productId == 'new'){}
					else {
						productMgr.loadDefaults($scope.productId,function(productDetails){
							$scope.product = productDetails.order_product;
							$scope.masterProductId =  productDetails.order_product.master_product_id;
							$scope.productName = productDetails.order_product.master_process_name;
							$scope.price_type = productDetails.order_product.price_type;
							$scope.lamination_type = productDetails.order_product.lamination_type;
							if($scope.price_type != 'N/A')
								$scope.showPrice = true;
							if($scope.product.lamination)
								$scope.showLaminationType = true;
							$scope.isProductShown = true;
							$scope.applyChanges();
						});
					}
					$scope.applyChanges();
			});
		}

		$scope.loadDefaults();

		$scope.createProduct = function(option) {
			$scope.product.master_product_id = $scope.masterProductId;
			$scope.product.master_process_name = $scope.productName;
			$scope.product.price_type = $scope.price_type;
			$scope.product.lamination_type = $scope.lamination_type;
			//$scope.order_id = $scope.orderId;
			var errorMsg = productMgr.validateProduct($scope.product);
			if(errorMsg.length == 0) {
				productMgr.createProduct($scope.product,$scope.productId,$scope.orderId,function(productInserted){
					$scope.productId = productInserted.order_product.id;
					$scope.isProductShown = true;
					$scope.applyChanges();
					$.toaster({ priority : 'success', title : 'Info', message : 'Order Product is Saved',width:'100%'});
					if(option == 'savereturn')
						$state.go('index.order.create.order_delivery',{orderId: $scope.orderId});
					else
					{
						console.log('khghINNNNNNNNNNNNNNNNNN');
						$scope.productId = 'new';
						$scope.loadDefaults();
						$state.go('index.order.create.order_delivery',{orderId:$scope.orderId,productId:'new'});
					}
				});
			}
			else {
				$scope.productErrorMsg = errorMsg;
			}
		}

		$scope.editProduct = function() {
			$scope.isProductShown = false;
		}


		$scope.navigateToProductPlan = function() {
			$location.path('/productprocessplan/'+$scope.orderId+'/'+$scope.productId+'/new');
		}

		$scope.productChanged = function() {
			var name;
			for(var counter = 0; counter <  $scope.allMasterProducts.length; counter++) {
				if($scope.allMasterProducts[counter].id == $scope.masterProductId) {
					name = $scope.allMasterProducts[counter].name ;
					break;
				}
			}
			$scope.productName = name;
		}

		$scope.checkPrice = function(priceSelected) {
			if(priceSelected != 'N/A')
				$scope.showPrice = true;
			else
				$scope.showPrice = false;
		}

		$scope.checkLamination = function(isSelected) {
			if(isSelected)
				$scope.showLaminationType = true;
			else
				$scope.showLaminationType = false;
		}

    });
