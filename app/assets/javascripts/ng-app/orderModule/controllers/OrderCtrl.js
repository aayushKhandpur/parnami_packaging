orderModule.controller('orderCtrl', function ($scope,$log,$location,orderMgr,$stateParams,$timeout,$state,processOneLocationMgr,SweetAlert,$rootScope,$modal) {

		$scope.order = {};
		$scope.mobile_number;
		$scope.isOrderShown = false
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
						$scope.order = orderDetails.orderProperty.order;
						$scope.productList = orderDetails.productList;
						$scope.orderPlanDeliveryList = orderDetails.orderDeliveryPlanList;
						var cust = orderMgr.getCustomerByIdFromList(orderDetails.orderProperty.order.customer_id,$scope.allCustomers);
						$scope.mobile_number = cust.mobile_number;
						$scope.customer_name = cust.name;
						$scope.billing_name = cust.billing_name;
						$scope.showOrderMenu = true;
						$scope.order_date = $scope.order.delivery_date;
						$scope.customer_id = cust.id;
						$scope.isOrderShown = true;
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
							if(data.length > 0){
								$scope.orderTransactionList = data;
							}
						})

						$scope.applyChanges();
					});
				}
				$scope.applyChanges();
			});
		}

		$scope.loadDefaults();

		$scope.createOrder = function(form) {
			if(form.$invalid){
					$scope.formSubmitted=true;
					return;
			}
			var errorMsg = orderMgr.validateOrder($scope.order);
			if(errorMsg.length == 0) {
				orderMgr.createOrder($scope.order,$scope.orderId,function(orderInserted){
					$scope.orderId = orderInserted.order.id;
					$scope.order_date = orderInserted.order.delivery_date;
					$scope.isOrderShown = true;
					$scope.applyChanges();
					$.toaster({ priority : 'success', title : 'Info', message : 'Your Order is Saved...you can now proceed to create Order Products',width:'100%'});
					$location.path('/index/order/'+$scope.orderId+'/order_product');
				});
			}
			else {
				$scope.orderErrorMsg = errorMsg;
			}
		}

		$scope.createOrderPlan = function(orderPlan,callbackFunction) {
			orderPlan.order_id = $scope.orderId;
			orderPlan.customer_id = $scope.customer_id;
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

		$scope.updateMobileAndAddress = function(customerSelected) {
			if(customerSelected != null) {
				$scope.order.customer_id = customerSelected.id;
				$scope.customer_name = customerSelected.name;
				$scope.mobile_number = customerSelected.mobile_number;
				$scope.order.delivery_address = customerSelected.billing_address;
				$scope.showOrderMenu = true;
				$scope.billing_name = customerSelected.billing_name;
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
				SweetAlert.swal({
					 title: "Delete Order Delivery Plan!!",
					 text: "Are you sure you want to delete order delivery plan?",
					 type: "warning",
					 showCancelButton: true,
					 confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
					 cancelButtonText: "Cancel",
					 closeOnConfirm: true,
					 closeOnCancel: true },
					 function(isConfirm){
							if (isConfirm) {
								$scope.orderPlanDeliveryList.splice($scope.orderPlanDeliveryList.length -1,1);
								$scope.orderPlanErrorMsg = '';
							}
						});

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


		$scope.go = function ( path ) {
			$location.path( path );
		};



$scope.addTransactionModel = function(transaction,index){
	var addTransactionModelInstance = $modal.open({
			templateUrl: 'ng-app/orderModule/templates/add-transaction-popup.html',
			controller: 'TransactionUpdateCtrl',
			backdrop: 'static',
			size: 'md',
			resolve: {
					transaction: function(){
							return angular.copy(transaction);
					}
			}

	});

	addTransactionModelInstance.result.then(function (transaction) {
		processOneLocationMgr.getTransactions($scope.orderId,function(data){
			if(data.length > 0){
				$scope.orderTransactionList = data;
			}
		})
	}, function () {

			//$log.info('Modal dismissed at: ' + new Date());
	});
};


    });


		angular.module('AngularRails').config(['valdrProvider','CONTACT_NUMBER_REGEXP','EMAIL_REGEXP','CONTACT_NUMBER_REGEXP2', function(valdrProvider,CONTACT_NUMBER_REGEXP,EMAIL_REGEXP,CONTACT_NUMBER_REGEXP2) {

		  valdrProvider.addConstraints({
		    "OrderCreate": {
					'customerName': {
						'required': {
							'message': 'Customer name is required'
						}
					},
					'mobileNumber': {
						'required': {
							'message': 'Mobile number is required'
						},
						"pattern": {
							 "value": CONTACT_NUMBER_REGEXP,
							 "message": "Mobile number is not valid"
						}
					},
					'deliveryDate': {
						'required': {
							'message': 'Delivery date is required'
						}
					},
					'address': {
						'required': {
							'message': 'Address is required'
						}
					},
					'billingName': {
						'required': {
							'message': 'Billing name is required'
						}
					},

		    }
		  });
		}]);
