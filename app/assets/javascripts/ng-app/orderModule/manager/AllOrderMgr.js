orderModule.service('allOrderMgr', function (orderSrv,customerSrv) {

	var self = this;

	this.getAllOrders = function(callbackFunction) {
		var orderList = [];
		orderSrv.getAllOrders(function(allOrders) {
			self.getCustomerMap(function(customerMap,customerBillingMap){
				for(var counter = 0;counter < allOrders.length;counter++) {
					allOrders[counter].order.customer_name = customerMap[allOrders[counter].order.customer_id];
					allOrders[counter].order.billing_name = customerBillingMap[allOrders[counter].order.customer_id];
					orderList.push(allOrders[counter].order);
				}
				callbackFunction(orderList);
			});
		});
	}
	this.getCustomerMap = function(callbackFunction) {
		var customerMap = new Object();
		var customerBillingMap = new Object();
		customerSrv.getAllCustomers(function(allCustomers){
			for(var counter = 0; counter < allCustomers.length; counter++) {
				customerMap[allCustomers[counter].customer.id] = allCustomers[counter].customer.name;
			}
			for(var counter = 0; counter < allCustomers.length; counter++) {
				customerBillingMap[allCustomers[counter].customer.id] = allCustomers[counter].customer.billing_name;
			}
			callbackFunction(customerMap,customerBillingMap);
		});
	}
});
