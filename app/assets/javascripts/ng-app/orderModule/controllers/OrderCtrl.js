orderModule.controller('orderCtrl', function ($scope,$log,$location,orderMgr,$stateParams,$timeout) {
	
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
		$scope.showOrderMenu;
		$scope.allOrderProducts = [];
		$scope.customer_id;
		$scope.order_date;
		$scope.orderErrorMsg = '';
		$scope.orderPlanErrorMsg = '';
		
		$scope.applyChanges = function()
	    {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }
		
		$scope.loadDefaults = function() {
			$scope.showOrderMenu = false;
			orderMgr.getAllCustomers(function(data) {
				$.each(data,function(k,v){
					v.customer.nameNumberAddress = v.customer.name+','+v.customer.mobile_number+','+v.customer.billing_address;
					$scope.allCustomers.push(v.customer);
				});
				
				if($scope.orderId == 'new'){
				}
				else {
					orderMgr.loadDefaults($scope.orderId,function(orderDetails,customerDetails) {
						console.log('####'+JSON.stringify(orderDetails));
						$scope.order = orderDetails.orderProperty.order;
						$scope.productList = orderDetails.productList;
						console.log('2dd'+JSON.stringify(orderDetails.orderDeliveryPlanList));
						$scope.orderPlanDeliveryList = orderDetails.orderDeliveryPlanList;
						var cust = orderMgr.getCustomerByIdFromList(orderDetails.orderProperty.order.customer_id,$scope.allCustomers);
						$scope.mobile_number = cust.mobile_number;
						$scope.customer_name = cust.name;
						$scope.showOrderMenu = true;
						$scope.order_date = $scope.order.delivery_date;
						$scope.customer_id = cust.id;
						$scope.isOrderShown = true;
						console.log('@!@33'+JSON.stringify(customerDetails));
						orderMgr.getOrderProductById($scope.orderId,function(data){
							$scope.allOrderProducts = data;
							$scope.addDatePicker();
							if(data.length > 0) {
								$scope.orderDeliveryPlanTemplate = {
									order_product_id: angular.copy(data[0].productId),
									quantity: 0,
									isEditable: true,
									delivery_date: ''
								};
							}
							$scope.applyChanges();
						});
						$scope.applyChanges();
					});
				}
				$scope.applyChanges();
			});
		}
		
		$scope.loadDefaults();
		
		$scope.createOrder = function() {
			var errorMsg = orderMgr.validateOrder($scope.order);
			if(errorMsg.length == 0) {
				orderMgr.createOrder($scope.order,$scope.orderId,function(orderInserted){
					console.log(JSON.stringify(orderInserted));
					console.log('###'+orderInserted.order.id);
					$scope.orderId = orderInserted.order.id;
					$scope.order_date = orderInserted.order.delivery_date;
					$scope.isOrderShown = true;
					$scope.applyChanges();
					alert('Your order is saved...');
					$location.path('/createorder/'+$scope.orderId);
				});
			}
			else {
				$scope.orderErrorMsg = errorMsg;
			}
		}
		
		$scope.createOrderPlan = function(orderPlan) {
			orderPlan.order_id = $scope.orderId;
			orderPlan.customer_id = $scope.customer_id;
			orderMgr.validateOrderPlan(orderPlan,$scope.productList,function(errorMsg) {
				if(errorMsg.length == 0) {
					orderMgr.createOrderPlan(orderPlan,function(data){
						orderMgr.getOrderPlanByOrderId($scope.orderId,function(planList) {
							$scope.orderPlanDeliveryList = planList;
							$scope.orderPlanErrorMsg = '';
							$scope.applyChanges();
						});
						alert('Product Plan is saved...!!!');
					});
				}
				else {
					$scope.orderPlanErrorMsg = errorMsg;
					$scope.applyChanges();
				}
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
		
		$scope.addOrderDeliveryPlan = function() {
			var orderPlan = (angular.copy($scope.orderDeliveryPlanTemplate));
			$scope.orderPlanDeliveryList.push(orderPlan);
			$timeout(function() {
				$scope.addDatePicker();
			},50);
		}
		
		$scope.updateMobileAndAddress = function() {
			if($scope.customerSelected != null) {
				$scope.order.customer_id = $scope.customerSelected.id;
				$scope.customer_name = $scope.customerSelected.name;
				$scope.mobile_number = $scope.customerSelected.mobile_number;
				$scope.order.delivery_address = $scope.customerSelected.billing_address;
				$scope.showOrderMenu = true;
			}
			else {
				$scope.customer_name = '';
				$scope.mobile_number = '';
				$scope.order.delivery_address = '';
				$scope.showOrderMenu = false;
			}
		}
		$scope.addDatePicker = function() {
			var endDate = $scope.order_date.split('-').join('/');
			 $('.plandatepicker').each(function(){
				$(this).datepicker({
					orientation:"top",
					autoclose:true,
					format:"yyyy/mm/dd",
					startDate:'0',
					endDate: endDate
				});
			});
		}
		$scope.executeCRUDOperationForOrderPlan = function(actionPerformed,orderPlan) {
			if(actionPerformed == 'cancel') {
				$scope.orderPlanDeliveryList.splice($scope.orderPlanDeliveryList.length -1,1);
				$scope.orderPlanErrorMsg = '';
			}
			else if(actionPerformed == 'edit') {
				orderPlan.isEditable = true;
			}
			else if(actionPerformed == 'add') {
				$scope.createOrderPlan(orderPlan);
			}
			else if(actionPerformed == 'split') {
			}
		}
    });