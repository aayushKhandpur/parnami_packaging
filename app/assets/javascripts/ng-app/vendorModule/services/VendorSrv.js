vendorModule.factory('vendorSrv', function ($http) {
        
	return {
		getLocations: function(callbackFunction) {
			var httpRequest = $http.get('/vendors');
			httpRequest.success(function(data){
				callbackFunction(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		},
		insertLocation: function(location,callbackFunction) {
			var httpRequest = $http.post('/vendors',location);
			httpRequest.success(function(data){
				callbackFunction(data);
			
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		},
		updateLocation: function(locationId,location,callbackFunction) {
			var httpRequest = $http.put('/vendors/'+locationId,location);
			httpRequest.success(function(data){
				callbackFunction(data);
			
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		}
	};	
		
});