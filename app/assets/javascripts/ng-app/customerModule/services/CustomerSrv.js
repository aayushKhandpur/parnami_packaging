customerModule.service('customerSrv', function ($http) {

		var self = this;
		//this.allCustomers = [];

		this.getAllCustomers = function(callbackFunction) {
			var httpRequest = $http.get('/customers');
			httpRequest.success(function(data){
				//self.allCustomers = data;
				callbackFunction(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		}
		this.insertMasterProduct = function(masterProduct,callbackFunction) {
			var httpRequest = $http.post('/customers',masterProduct);
			httpRequest.success(function(data){
				console.log('service'+JSON.stringify(data));
				callbackFunction(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		}
		this.updateMasterProduct = function(masterProductId,masterProduct,callbackFunction) {
			var httpRequest = $http.put('/customers/'+masterProductId,masterProduct);
			httpRequest.success(function(data){
				callbackFunction(data);

			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		}
    });
