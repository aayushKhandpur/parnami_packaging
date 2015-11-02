productPlanModule.controller('productPlanCtrl', function ($scope,$log,$stateParams,orderPlanMgr,$location) {
		
		$scope.orderPlan = {};
		$scope.orderId = $stateParams.orderId;
		$scope.productId = $stateParams.productId;
		$scope.orderPlanId = $stateParams.orderPlanId;
		$scope.isPlanShown = false;
		
		$scope.orderPlanStatus = {};
		$scope.processName;
		$scope.locationName;
		$scope.isOrderStatusShown = false;
		$scope.orderPlanStatusId = null;
		
		$scope.loadDefaults = function() {
			if($scope.orderPlanId == 'new')
				return;
			orderPlanMgr.loadDefaults($scope.orderPlanId,function(orderPlanDetails){
				console.log('@@@'+JSON.stringify(orderPlanDetails));
				$scope.orderPlan = orderPlanDetails.order_delivery_plan;
				$scope.isPlanShown = true;
				if(orderPlanDetails.orderDeliveryPlanStatus.length != 0) {
					$scope.orderPlanStatus = orderPlanDetails.orderDeliveryPlanStatus[0];
					$scope.orderPlanStatusId = orderPlanDetails.orderDeliveryPlanStatus.id;
					$scope.isOrderStatusShown = true;
					$scope.locationName = 'test location';
					$scope.processName = 'Printing';
				}
				$scope.applyChanges();
			});
		}
		
		$scope.loadDefaults();
		
		$scope.createPlan = function() {
			$scope.orderPlan.order_id = $scope.orderId;
			$scope.orderPlan.order_product_id = $scope.productId;
			orderPlanMgr.createPlan($scope.orderPlan,$scope.orderPlanId,$scope.orderId,function(insertedPlan){
				console.log('##'+JSON.stringify(insertedPlan));
				$scope.orderPlanId = insertedPlan.order_delivery_plan.id;
				$scope.isPlanShown = true;
				$scope.applyChanges();
				alert('Your order plan is saved...!!!');
				$location.path('/productprocessplan/'+$scope.orderId+'/'+$scope.productId+'/'+$scope.orderPlanId);
			});
		}
		
		$scope.editPlan = function() {
			$scope.isPlanShown = false;
		}
		
		$scope.createPlanStatus = function() {
			$scope.orderPlanStatus.order_id = $scope.orderId;
			$scope.orderPlanStatus.order_product_id = $scope.productId;
			$scope.orderPlanStatus.order_delivery_plan_id = $scope.orderPlanId;
			orderPlanMgr.createPlanStatus($scope.orderPlanStatus,$scope.locationName,$scope.processName,$scope.orderPlanStatusId,function(insertedPlanStatus) {
				console.log('@@@@@'+JSON.stringify(insertedPlanStatus));
				$scope.orderPlanStatusId = insertedPlanStatus.order_delivery_plan_process.id;
				$scope.isOrderStatusShown = true;
				$scope.applyChanges();
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
		
    });