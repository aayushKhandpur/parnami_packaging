orderModule.controller('orderCtrl', function ($scope,$log,$location,orderMgr,$stateParams) {
	
		$scope.order = {};
		$scope.mobile_number;
		$scope.isOrderShown = false;
		$scope.orderId = $stateParams.orderId;
		$scope.productList = [];
		$scope.orderPlanDeliveryList = [];
		$scope.customer_name;
		$scope.showProductOrDeliveryPlan = 'showProducts';
		$scope.allCustomers = [];
		$scope.customerSelected ;
		
		$scope.applyChanges = function()
	    {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }
		
		$scope.loadDefaults = function() {
			orderMgr.getAllCustomers(function(data) {
				$.each(data,function(k,v){
					$scope.allCustomers.push(v.customer);
				});
				$scope.customerSelected = $scope.allCustomers[0].id;
				$scope.mobile_number = angular.copy( $scope.allCustomers[0].mobile_number);
				$scope.order.delivery_address = angular.copy( $scope.allCustomers[0].billing_address);
				if($scope.orderId == 'new'){}
				else {
					orderMgr.loadDefaults($scope.orderId,function(orderDetails,customerDetails) {
						console.log('####'+JSON.stringify(orderDetails));
						$scope.order = orderDetails.orderProperty.order;
						$scope.productList = orderDetails.productList;
						$scope.orderPlanDeliveryList = orderDetails.orderDeliveryPlanList;
						$scope.isOrderShown = true;
						console.log('@!@33'+JSON.stringify(customerDetails));
						$scope.customerSelected = customerDetails.customer.id;
						$scope.mobile_number = customerDetails.customer.mobile_number;
						$scope.applyChanges();
					});
				}
				$scope.applyChanges();
			});
		}
		
		$scope.loadDefaults();
		
		$scope.createOrder = function() {
			$scope.order.customer_id = $scope.customerSelected;
			orderMgr.createOrder($scope.order,$scope.orderId,function(orderInserted){
				console.log(JSON.stringify(orderInserted));
				console.log('###'+orderInserted.order.id);
				$scope.orderId = orderInserted.order.id;
				$scope.isOrderShown = true;
				$scope.applyChanges();
				alert('Your order is saved...');
				$location.path('/createorder/'+$scope.orderId);
			});
		}
		
		$scope.navigateToProduct = function() {
			$location.path('/orderproducts/'+$scope.orderId+'/new');
		}
		
		$scope.editOrder = function() {
			$scope.isOrderShown = false;
		}
		
		$scope.toggleTab = function(tabChosen) {
			$scope.showProductOrDeliveryPlan = tabChosen;
		}
		
		$scope.navigateToProductPlan = function() {
			$location.path('/productprocessplan/'+$scope.orderId+'/new/new');
		}
		
		$scope.updateMobileAndAddress = function() {
			var selectedCustomer = {};
			for(var counter = 0; counter <  $scope.allCustomers.length; counter++) {
				if($scope.allCustomers[counter].id == $scope.customerSelected) {
					selectedCustomer = $scope.allCustomers[counter] ;
					break;
				}
			}
			$scope.mobile_number = selectedCustomer.mobile_number;
			$scope.order.delivery_address = selectedCustomer.billing_address;
		}
    });