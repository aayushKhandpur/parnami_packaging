productPlanModule.factory('productPlanSrv', function ($http) {
        
		return {
		
			getCustomerByNameAndMobile: function(cName,mobileNum,callbackFunction) {
				var httpRequest = $http({
					url: '/customers', 
					method: "GET",
					params: {search_name: cName,mobile_number: mobileNum}
				});
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getCustomerById: function(customerId,callbackFunction) {
				var httpRequest = $http({
					url: '/customers/'+customerId, 
					method: "GET"
				});
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			insertPlan: function(orderPlan,callbackFunction) {
				var httpRequest = $http.post('/order_delivery_plans',orderPlan);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			updatePlan: function(orderPlan,callbackFunction) {
				var httpRequest = $http.put('/order_delivery_plans/'+orderPlan.id,orderPlan);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			insertPlanStatus: function(orderPlanStatus,callbackFunction) {
				var httpRequest = $http.post('/order_delivery_plan_processes',orderPlanStatus);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			updatePlanStatus: function(orderPlanStatus,callbackFunction) {
				var httpRequest = $http.put('/order_delivery_plan_processes/'+orderPlanStatus.id,orderPlanStatus);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getAllPlans: function(callbackFunction) {
				var httpRequest = $http.get('/order_delivery_plans');
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getOrderPlanById:  function(orderPlanId,callbackFunction) {
				var httpRequest = $http.get('/order_delivery_plans/'+orderPlanId);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getAllPlanOrderStatus:  function(callbackFunction) {
				var httpRequest = $http.get('/order_delivery_plan_processes');
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getOrderPlanDeliveryByOrderId: function(orderId,callbackFunction) {
				var httpRequest = $http.get('/order_delivery_plans_custom/'+orderId);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			deletePlanProcess: function(planProcessId,callbackFunction) {
				var httpRequest = $http.delete('/order_delivery_plan_processes/'+planProcessId);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			checkPost: function(order_delivery_plan_id,callbackFunction){
				var httpRequest = $http.post('/order_delivery_plan_processes_bulupdate/'+order_delivery_plan_id);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getProductPlanByProductId: function(order_product_id,callbackFunction) {
				var httpRequest = $http.get('/order_delivery_plan_byproductid/'+order_product_id);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			}
		};	
		
    });