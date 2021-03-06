masterProductModule.service('masterProductMgr', function (masterProductSrv) {

	var self = this;

	this.getMasterProducts = function(callbackFunction) {
		masterProductSrv.getMasterProducts(function(allMasterProducts) {
			callbackFunction(allMasterProducts);
		});
	}
	this.createMasterProduct = function(masterProductId,masterProduct,callbackFunction) {
		if(masterProductId == null) {
			masterProduct.created_at = new Date();
			masterProduct.updated_at = new Date();
			masterProductSrv.insertMasterProduct(masterProduct,function(data) {
				callbackFunction(data);
			});
		}
		else {
			masterProduct.updated_at = new Date();
			masterProductSrv.updateMasterProduct(masterProductId,masterProduct,function(data) {
				callbackFunction(data);
			});
		}
	}
	this.deleteProduct = function(masterProductId,callbackFunction){
		masterProductSrv.deleteProduct(masterProductId,function(data) {
			callbackFunction();
		})
	}

	this.getMasterProductById = function(masterProductId,callbackFunction){
		masterProductSrv.getMasterProductById(masterProductId,function(data) {
			callbackFunction(data);
		})
	}
});
