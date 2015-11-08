masterProcessModule.service('masterProcessMgr', function (masterProcessSrv) {
	
	var self = this;
	
	this.getMasterProducts = function(callbackFunction) {
		masterProcessSrv.getProcesses(function(allMasterProducts) {
			callbackFunction(allMasterProducts);
		});
	}
	this.createMasterProduct = function(masterProductId,masterProduct,callbackFunction) {
		if(masterProductId == null) {
			masterProduct.created_at = new Date();
			masterProduct.updated_at = new Date();
			masterProcessSrv.insertMasterProduct(masterProduct,function(data) {
				console.log('data'+JSON.stringify(data));
				callbackFunction(data);
			});
		}
		else {
			masterProduct.updated_at = new Date();
			masterProcessSrv.updateMasterProduct(masterProductId,masterProduct,function(data) {
				callbackFunction(data);
			});
		}
	}
});