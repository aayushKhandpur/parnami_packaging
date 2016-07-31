transactionModule.service('processOneLocationMgr', function($log, proceesOneLocationSrv) {

    var self = this;

    this.insertProcessOneLocation = function(orderTransactionDetails, callbackFunction) {
        orderTransactionDetails.master_product_id = 1;
        proceesOneLocationSrv.insertProcessOneLocation(orderTransactionDetails, function(data) {
            callbackFunction(data)
        });
    }

    this.getTransactions = function(orderId, callbackFunction) {
        proceesOneLocationSrv.getTransactionsByOrderId(orderId, function(data) {
            callbackFunction(data)
        });
    }

});
