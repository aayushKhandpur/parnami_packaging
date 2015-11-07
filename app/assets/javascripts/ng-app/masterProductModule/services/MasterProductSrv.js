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
		var httpRequest = $http.get('/master_products');
		httpRequest.success(function(data){
			self.allMasterProducts = data;
			callbackFunction(data);
		});
		httpRequest.error(function(data){
			console.log(JSON.stringify(data));
		});
	}
	this.insertMasterProduct = function(masterProduct,callbackFunction) {
		var httpRequest = $http.post('/master_products',masterProduct);
		httpRequest.success(function(data){
			console.log('servicw'+JSON.stringify(data));
			callbackFunction(data);
		});
		httpRequest.error(function(data){
			console.log(JSON.stringify(data));
		});
	}
	this.updateMasterProduct = function(masterProductId,masterProduct,callbackFunction) {
		var httpRequest = $http.put('/master_products/'+masterProductId,masterProduct);
		httpRequest.success(function(data){
			callbackFunction(data);
		
		});
		httpRequest.error(function(data){
			console.log(JSON.stringify(data));
		});
	}
});