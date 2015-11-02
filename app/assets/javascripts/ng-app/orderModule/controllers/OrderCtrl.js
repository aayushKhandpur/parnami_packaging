orderModule.controller('orderCtrl', function ($scope,$log,$location,orderMgr,$stateParams) {
	
		$scope.order = {};
		$scope.mobile_number;
		$scope.isOrderShown = false;
		$scope.orderId = $stateParams.orderId;
		$scope.productList = [];
		$scope.customer_name;
		
		$scope.loadDefaults = function() {
			if($scope.orderId == 'new')
				return;
			else {
				orderMgr.loadDefaults($scope.orderId,function(orderDetails) {
					console.log('####'+JSON.stringify(orderDetails));
					$scope.order = orderDetails.orderProperty.order;
					$scope.productList = orderDetails.productList;
					$scope.isOrderShown = true;
					$scope.mobile_number = orderDetails.mobile_number;
					$scope.customer_name = orderDetails.customer_name;
					$scope.applyChanges();
				});
			}
		}
		
		$scope.loadDefaults();
		
		$scope.createOrder = function() {
			console.log('#@@'+$scope.customer_name);
			orderMgr.validateCustomerName($scope.customer_name,$scope.mobile_number,function(customerId){
				if(customerId == null) {
					alert('Customer does not exist in System');
					return;
				}
				else {
					$scope.order.customer_id = customerId;
					orderMgr.createOrder($scope.order,$scope.mobile_number,$scope.customer_name,$scope.orderId,function(orderInserted){
						console.log(JSON.stringify(orderInserted));
						console.log('###'+orderInserted.order.id);
						$scope.orderId = orderInserted.order.id;
						$scope.isOrderShown = true;
						$scope.applyChanges();
						alert('Your order is saved...');
						$location.path('/createorder/'+$scope.orderId);
					});
				}
			});
		}
		
		$scope.navigateToProduct = function() {
			$location.path('/orderproducts/'+$scope.orderId+'/new');
		}
		
		$scope.editOrder = function() {
			$scope.isOrderShown = false;
		}
		
		$scope.applyChanges = function()
	    {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }
		
		
    });