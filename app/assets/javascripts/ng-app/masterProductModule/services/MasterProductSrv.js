masterProductModule.service('masterProductSrv', function ($http) {

	var self =  this;
     this.allMasterProducts = [];   
		
	this.getMasterProductById = function(masterProductId,getMasterProduct) {
			var httpRequest = $http.get('/master_products/'+masterProductId);
			httpRequest.success(function(data){
				getMasterProduct(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
	}
	
	this.getMasterProducts = function(callbackFunction) {
		if(self.allMasterProducts.length != 0)
			callbackFunction(self.allMasterProducts);
		else {
			var httpRequest = $http.get('/master_products');
			httpRequest.success(function(data){
				self.allMasterProducts = data;
				callbackFunction(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		}
	}
});