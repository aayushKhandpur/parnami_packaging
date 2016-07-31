angular.module('orderModule')
    .factory('orderSrv', function ($http) {

		return {

			insertOrder: function(newOrder,getResponseData) {
				var httpRequest = $http.post('/orders',newOrder);
				httpRequest.success(function(data){
					getResponseData(data);

				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			updateOrder: function(updateOrder,orderId,getResponseData) {
				var httpRequest = $http.put('/orders/'+orderId,updateOrder);
				httpRequest.success(function(data){
					getResponseData(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getOrderById: function(orderId,getOrder) {
				var httpRequest = $http.get('/orders/'+orderId);
				httpRequest.success(function(data){
					getOrder(data);

				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getAllOrders: function(callbackFunction) {
				var httpRequest = $http.get('/orders');
				httpRequest.success(function(data){
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			}
		};

    });
