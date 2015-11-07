customerModule.service('customerSrv', function ($http) {
       
		var self = this;
		this.allCustomers = [];
		
		this.getAllCustomers = function(callbackFunction) {
			if(self.allCustomers.length != 0)
				callbackFunction(self.allCustomers);
			else {
				var httpRequest = $http.get('/customers');
				httpRequest.success(function(data){
					self.allCustomers = data;
					callbackFunction(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			}
		}
    });