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
			updatePlan: function(orderPlan,orderPlanId,callbackFunction) {
				var httpRequest = $http.put('/order_delivery_plans/'+orderPlanId,orderPlan);
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getLocations: function(callbackFunction) {
				var httpRequest = $http.get('/locations');
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getProcesses: function(callbackFunction) {
				var httpRequest = $http.get('/master_processes');
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
			updatePlanStatus: function(orderPlanStatus,id,callbackFunction) {
				var httpRequest = $http.put('/order_delivery_plan_processes/'+id,orderPlanStatus);
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
			}
		};	
		
    });