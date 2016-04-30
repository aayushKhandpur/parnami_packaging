transactionModule.service('proceesOneLocationSrv', function ($http) {

	var self = this;

	this.insertProcessOneLocation = function(order_transactions,callbackFunction)
	{
		var httpRequest = $http.post('/order_transactions',order_transactions);
		httpRequest.success(function(data){
			console.log('success');
			console.log(JSON.stringify(data));
			callbackFunction(data);
		});
		httpRequest.error(function(data){
			console.log(JSON.stringify(data));
		});
	}


});
