orderModule.controller('orderCtrl', function ($scope,$log,$location,orderMgr,$stateParams,$timeout,$state,processOneLocationMgr) {

		$scope.order = {};
		$scope.mobile_number;
		$scope.isOrderShown = false;
		$scope.orderId = $stateParams.orderId;
		$scope.productList = [];
		$scope.orderPlanDeliveryList = [];
		$scope.customer_name;
		$scope.showProductOrDeliveryPlan = 'showOrder';
		$scope.allCustomers = [];
		$scope.customerSelected ;
		$scope.showOrderMenu;
		$scope.allOrderProducts = [];
		$scope.customer_id;
		$scope.order_date;
		$scope.orderErrorMsg = '';
		$scope.orderPlanErrorMsg = '';
		$scope.orderTransactionList = [];
		$scope.billing_name;

		$scope.applyChanges = function()
	    {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }

		$scope.loadDefaults = function() {
			$scope.showOrderMenu = false;
			orderMgr.getAllCustomers(function(data) {
				$.each(data,function(k,v){
					v.customer.nameNumber = v.customer.name+', '+v.customer.mobile_number;
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
						$scope.billing_name = cust.billing_name;
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
									delivery_date: '',
									splittedFromId: ''
								};
							}
							$scope.applyChanges();
						});
						processOneLocationMgr.getTransactions($scope.orderId,function(data){
							console.log(data);
							if(data.length > 0){
								$scope.orderTransactionList = data;
								console.log(JSON.stringify($scope.orderTransactionList));
							}
						})

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
					$.toaster({ priority : 'success', title : 'Info', message : 'Your Order is Saved...you can now proceed to create Order Products',width:'100%'});
					$location.path('/createorder/'+$scope.orderId);
				});
			}
			else {
				$scope.orderErrorMsg = errorMsg;
			}
		}

		$scope.createOrderPlan = function(orderPlan,callbackFunction) {
			orderPlan.order_id = $scope.orderId;
			orderPlan.customer_id = $scope.customer_id;
			console.log('##'+orderPlan.splittedFromId);
			if(orderPlan.splittedFromId == null || orderPlan.splittedFromId == '') {
				orderMgr.validateOrderPlan(orderPlan,$scope.productList,function(errorMsg) {
					if(errorMsg.length == 0) {
						orderMgr.createOrderPlan(orderPlan,function(data){
							orderMgr.getOrderPlanByOrderId($scope.orderId,function(planList) {
								$scope.orderPlanDeliveryList = planList;
								$scope.orderPlanErrorMsg = '';
								$scope.applyChanges();
							});$.toaster({ priority : 'success', title : 'Info', message : 'Order Product Plan is Saved',width:'100%'});
							callbackFunction('success');
						});
					}
					else {
						$scope.orderPlanErrorMsg = errorMsg;
						$scope.applyChanges();
						callbackFunction('failure');
					}
				});
			}
			else {
				$scope.createAndUpdatePlan(orderPlan);
			}
		}

		$scope.createAndUpdatePlan = function(orderPlan) {
			var updateOrderPlan = orderMgr.getProcessPlanById(orderPlan.splittedFromId,$scope.orderPlanDeliveryList);
			var validateResult = orderMgr.validateSplitQuantity(updateOrderPlan,orderPlan);
			if(validateResult.length == 0) {
				updateOrderPlan.quantity = updateOrderPlan.quantity - orderPlan.quantity;
				$scope.createOrderPlan(updateOrderPlan,function(updateResult) {
					orderPlan.splittedFromId = '';
					$scope.createOrderPlan(orderPlan,function(saveResult) {
					});
				});
			}
			else {
				$scope.orderPlanErrorMsg = validateResult;
			}

		}

		$scope.navigateToProduct = function() {
			$state.go('index.neworderproducts',{orderId:$scope.orderId,productId:'new'});
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
				$scope.billing_name = $scope.customerSelected.billing_name;
			}
			else {
				$scope.customer_name = '';
				$scope.mobile_number = '';
				$scope.order.delivery_address = '';
				$scope.showOrderMenu = false;
				$scope.billing_name = '';
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
				$scope.addOrderDeliveryPlan();
				$scope.orderPlanDeliveryList[$scope.orderPlanDeliveryList.length - 1].splittedFromId = orderPlan.id;
				$scope.orderPlanDeliveryList[$scope.orderPlanDeliveryList.length - 1].order_product_id = orderPlan.order_product_id;
			}
		}
    });
