transactionModule.service('processOneLocationMgr', function ($log,proceesOneLocationSrv) {

	var self = this;

	this.insertProcessOneLocation = function(orderTransactionDetails)
	{
		orderTransactionDetails.master_product_id = 1;
		$log.info('Data US::'+JSON.stringify(orderTransactionDetails));
		proceesOneLocationSrv.insertProcessOneLocation(orderTransactionDetails,function(data){

		});
	}

	this.getTransactions = function(orderId,callbackFunction)
	{
		proceesOneLocationSrv.getTransactionsByOrderId(orderId,function(data){
			callbackFunction(data)
		});
	}

});
