productPlanModule.controller('productPlanCtrl', function ($scope,$log,$stateParams,orderPlanMgr,$location) {
		
		$scope.orderPlan = {};
		$scope.orderId = $stateParams.orderId;
		$scope.productId = $stateParams.productId;
		$scope.orderPlanId = $stateParams.orderPlanId;
		$scope.isPlanShown = false;
		$scope.allOrderProducts = [];
		$scope.productSelectedId;
		
		$scope.orderPlanStatus = {};
		$scope.processName;
		$scope.locationName;
		$scope.isOrderStatusShown = false;
		$scope.orderPlanStatusId = null;
		$scope.allPlanProcessList = [];
		$scope.showGrid = true;
		$scope.locationPicklist = [];
		$scope.processPicklist = [];
		$scope.locId;
		$scope.proId;
		
		$scope.loadDefaults = function() {
			orderPlanMgr.getPicklistData($scope.orderId,function(orderProductList,locationList,processList){
				$scope.isPlanShown = false;
				$scope.allOrderProducts = [];
				$scope.locationPicklist = [];
				$scope.processPicklist = [];
				$scope.orderPlan = {};
				$scope.allOrderProducts = angular.copy(orderProductList);
				$scope.productSelectedId = $scope.allOrderProducts[0].productId;
				if($scope.orderPlanId == 'new'){}
				else {
					orderPlanMgr.loadDefaults($scope.orderPlanId,function(orderPlanDetails){
						$scope.orderPlan = orderPlanDetails.order_delivery_plan;
						$scope.productSelectedId = orderPlanDetails.order_delivery_plan.order_product_id;
						$scope.isPlanShown = true;
						if(orderPlanDetails.orderDeliveryPlanStatus.length != 0) {
							$scope.allPlanProcessList = orderPlanDetails.orderDeliveryPlanStatus;
						}
						$scope.applyChanges();
					});
				}
				$.each(locationList,function(k,v){
					$scope.locationPicklist.push(v.location);
				});
				$scope.locId = $scope.locationPicklist[0].id;
				$.each(processList,function(k,v){
					$scope.processPicklist.push(v.master_process);
				});
				$scope.proId = $scope.processPicklist[0].id;
				$scope.processName = $scope.processPicklist[0].name;
				$scope.applyChanges();
			});
		}
		
		$scope.loadDefaults();
		
		$scope.createPlan = function(option) {
			$scope.orderPlan.order_id = $scope.orderId;
			$scope.orderPlan.order_product_id = $scope.productSelectedId;
			orderPlanMgr.createPlan($scope.orderPlan,$scope.orderPlanId,$scope.orderId,function(insertedPlan){
				console.log('##'+JSON.stringify(insertedPlan));
				$scope.isPlanShown = true;
				alert('Your order plan is saved...!!!');
				console.log('!!!!!!!!!!!!!!!!!!!'+option);
				if(option == 'return')
					$location.path('/createorder/'+$scope.orderId);
				else {
					$scope.orderPlanId = 'new';
					$scope.loadDefaults();
					$location.path('/productprocessplan/'+$scope.orderId+'/new/new');
				}
			});
		}
		
		$scope.editPlan = function() {
			$scope.isPlanShown = false;
		}
		
		$scope.createPlanStatus = function() {
			$scope.orderPlanStatus.order_id = $scope.orderId;
			$scope.orderPlanStatus.order_product_id = $scope.productSelectedId;
			$scope.orderPlanStatus.order_delivery_plan_id = $scope.orderPlanId;
			$scope.orderPlanStatus.master_process_name = $scope.processName;
			$scope.orderPlanStatus.master_process_id = $scope.proId;
			$scope.orderPlanStatus.location_id = $scope.locId;
			orderPlanMgr.createPlanStatus($scope.orderPlanStatus,$scope.orderPlanStatusId,function(insertedPlanStatus) {
				orderPlanMgr.loadDefaults($scope.orderPlanId,function(orderPlanDetails){
				$scope.orderPlan = orderPlanDetails.order_delivery_plan;
				$scope.productSelectedId = orderPlanDetails.order_delivery_plan.order_product_id;
				$scope.isPlanShown = true;
				if(orderPlanDetails.orderDeliveryPlanStatus.length != 0) {
					$scope.allPlanProcessList = orderPlanDetails.orderDeliveryPlanStatus;
				}
				$scope.applyChanges();
			});
			$scope.showGrid =  true;
			$scope.orderPlanStatus = {};
			alert('Your order plan status is saved...!!!');
			});
		}
		
		$scope.editPlanStatus = function() {
			$scope.isOrderStatusShown = false;
		}
		
		$scope.applyChanges = function() {
		   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
			   $scope.$apply();
	    }

		$scope.processChanges = function() {
			var pName = {};
			for(var counter = 0; counter < $scope.processPicklist.length ; counter++) {
				if($scope.processPicklist[counter].id == $scope.proId) {
					pName = $scope.processPicklist[counter].name;
					break;
				}
			}
			$scope.processName = pName;
		}
		
		$scope.showPlanStatus = function(id) {
			var planProcess = {};
			for(var counter = 0; counter < $scope.allPlanProcessList.length ; counter++) {
				if( $scope.allPlanProcessList[counter].id == id) {
					planProcess =  $scope.allPlanProcessList[counter];
					break;
				}
			}
			$scope.orderPlanStatus = planProcess;
			$scope.locId = planProcess.location_id;
			$scope.proId = planProcess.master_process_id;
			$scope.processName = planProcess.master_process_name;
			$scope.showGrid = false;
			$scope.isOrderStatusShown = true;
			$scope.orderPlanStatusId = planProcess.id;
		}
		
    });