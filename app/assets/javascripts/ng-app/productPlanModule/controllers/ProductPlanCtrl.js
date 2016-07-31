productPlanModule.controller('productPlanCtrl', function ($scope,$log,$stateParams,orderPlanMgr,$location,processOneLocationMgr,SweetAlert) {

		$scope.orderPlan = {};
		$scope.orderId = $stateParams.orderId;
		$scope.productId = $stateParams.productId;
		$scope.orderPlanId = $stateParams.orderPlanId;

		$scope.allPlanProcessList = [];
		$scope.locationPicklist = [];
		$scope.processPicklist = [];
		$scope.vendorPicklist = [];
		$scope.check = [];

		$scope.loadDefaults = function() {
			orderPlanMgr.getPicklistData(function(locationList,processList,vendorList){
				$scope.locationPicklist = [];
				$scope.processPicklist = [];
				$scope.vendorPicklist = [];
				orderPlanMgr.loadDefaults($scope.orderPlanId,function(orderPlanDetails){
					$scope.orderPlan = orderPlanDetails.order_delivery_plan;
					if(orderPlanDetails.orderDeliveryPlanStatus.length != 0) {
						$scope.allPlanProcessList = orderPlanDetails.orderDeliveryPlanStatus;
					}
					$scope.applyChanges();
				});
				$.each(locationList,function(k,v){
					$scope.locationPicklist.push(v.location);
				});
				$.each(processList,function(k,v){
					$scope.processPicklist.push(v.master_process);
				});
				$.each(vendorList,function(k,v){
					$scope.vendorPicklist.push(v.vendor);
				});
				$scope.orderPlanProcessTemplate = {
					master_process_name : $scope.processPicklist[0].name,
					master_process_id: $scope.processPicklist[0].id ,
					location_id : $scope.locationPicklist[0].id,
					vendor_id: '',
					isEditable: true
				};
				$scope.applyChanges();
			});
		}

		$scope.loadDefaults();

		$scope.editPlan = function() {
			$scope.isPlanShown = false;
		}

		$scope.createPlanStatus = function(planProcess) {
			planProcess.sequence_number = orderPlanMgr.getSequenceNumber($scope.allPlanProcessList);
			planProcess.order_id = $scope.orderId;
			planProcess.order_product_id = $scope.productId;
			planProcess.order_delivery_plan_id = $scope.orderPlanId;
			orderPlanMgr.createPlanStatus(planProcess,function(insertedPlanStatus) {
				orderPlanMgr.getPlanProcessByPlanId($scope.orderPlanId,function(data){
					$scope.allPlanProcessList = data;
					$scope.check = angular.copy(data);
					$.toaster({ priority : 'success', title : 'Info', message : 'Order Product Delivery Plan is Saved',width:'100%'});
					$scope.applyChanges();
				});
				$scope.applyChanges();
			});
		}

		$scope.applyChanges = function() {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }

		$scope.locationChanged = function(planProcess) {
			var name;
			for(var counter = 0;counter < $scope.locationPicklist.length; counter++) {
				if($scope.locationPicklist[counter].id == planProcess.location_id) {
					name = $scope.locationPicklist[counter].name;
					break;
				}
			}
			if(name.toLowerCase() == 'Vendor'.toLowerCase()) {
				planProcess.vendor_id = $scope.vendorPicklist[0].id;
			}
			else {
				planProcess.vendor_id = '';
			}
		}

		$scope.processChanged = function(planProcess) {
			for(var counter = 0;counter < $scope.processPicklist.length; counter++) {
				if($scope.processPicklist[counter].id == planProcess.master_process_id) {
					planProcess.master_process_name = $scope.processPicklist[counter].id.name;
					break;
				}
			}
		}

		$scope.addOrderPlanProcess = function() {
			$scope.allPlanProcessList.push(angular.copy($scope.orderPlanProcessTemplate));
		}

		$scope.deleteOrderPlanProcess = function(planProcessId) {
			orderPlanMgr.deletePlanProcess(planProcessId,function(data) {
				orderPlanMgr.getPlanProcessByPlanId($scope.orderPlanId,function(data){
					$scope.allPlanProcessList = data;
					$scope.check = angular.copy(data);
					$scope.applyChanges();
				});
			});
			$scope.applyChanges();
		}


		$scope.executeCRUDOperation = function(actionPerformed,planProcess) {
			if(actionPerformed == 'cancel')
				$scope.allPlanProcessList.splice($scope.allPlanProcessList.length -1,1);
			else if(actionPerformed == 'edit')
				planProcess.isEditable = true;
			else if(actionPerformed == 'add') {
				$scope.createPlanStatus(planProcess);
			}
			else if(actionPerformed == 'delete')
			SweetAlert.swal({
				 title: "Delete Order Delivery Plan Process!!",
				 text: "Are you sure you want to delete order delivery plan process?",
				 type: "warning",
				 showCancelButton: true,
				 confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
				 cancelButtonText: "Cancel",
				 closeOnConfirm: true,
				 closeOnCancel: true },
				 function(isConfirm){
						if (isConfirm) {
							$scope.deleteOrderPlanProcess(planProcess.id);
						}
					});

		}

		$scope.initiateOrder = function()
		{
			var orderTransactionDetails = {};
			var lName = '';
			var lId = $scope.allPlanProcessList[0].order_delivery_plan_process.location_id;
			$.each($scope.locationPicklist,function(k,v){
				if(lId == v.id)
				{
					lName = v.name;
				}
			});
			orderTransactionDetails.order_id = $scope.orderId;
			orderTransactionDetails.order_product_id = $scope.productId;
			orderTransactionDetails.order_delivery_plan_id = $scope.orderPlanId;
			orderTransactionDetails.order_delivery_plan_process_id = $scope.allPlanProcessList[0].order_delivery_plan_process.id;
			orderTransactionDetails.status = 'In Process';
			orderTransactionDetails.process_start_date = new Date();
			orderTransactionDetails.quantity_recieved = $scope.orderPlan.quantity;
			orderTransactionDetails.process_end_date= $scope.orderPlan.delivery_date;
			orderTransactionDetails.lName = lName;
			//$log.info(JSON.stringify($scope.allPlanProcessList));
			processOneLocationMgr.insertProcessOneLocation(orderTransactionDetails,function(transactionDetails) {
				$.toaster({ priority : 'success', title : 'Info', message : 'Transaction is Saved',width:'100%'});
				$scope.orderPlan.is_transaction_initiated = true;
				orderPlanMgr.createPlan($scope.orderPlan,function(orderPlan) {
					$scope.is_transaction_initiated = orderPlan.order_delivery_plan.is_transaction_initiated;
				})
			});
		}

    });
