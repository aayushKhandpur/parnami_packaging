customerModule.service('customerMgr', function (customerSrv) {
	
	var self = this;
	
	this.getMasterProducts = function(callbackFunction) {
		customerSrv.getAllCustomers(function(allMasterProducts) {
			callbackFunction(allMasterProducts);
		});
	}
	this.createMasterProduct = function(masterProductId,masterProduct,callbackFunction) {
		if(masterProductId == null) {
			masterProduct.created_at = new Date();
			masterProduct.updated_at = new Date();
			customerSrv.insertMasterProduct(masterProduct,function(data) {
				console.log('data'+JSON.stringify(data));
				callbackFunction(data);
			});
		}
		else {
			masterProduct.updated_at = new Date();
			customerSrv.updateMasterProduct(masterProductId,masterProduct,function(data) {
				callbackFunction(data);
			});
		}
	}
});