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

	this.validateCustomer = function(customer){
		var errorMsg = '';
		if(customer.mobile_number == null || customer.mobile_number.length == 0)
			errorMsg += "<ul><li>Mobile Number can't be blank</li></ul>" ;
			return errorMsg;
	}
	this.getCustomerById = function(customerId,callbackFunction) {
		customerSrv.getCustomerById(customerId,function(masterProducts) {
			callbackFunction(masterProducts);
		});
	}

});
