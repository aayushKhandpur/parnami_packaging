locationModule.factory('locationSrv', function ($http) {
        
	return {
		getLocations: function(callbackFunction) {
			var httpRequest = $http.get('/locations');
			httpRequest.success(function(data){
				callbackFunction(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		},
		getLocationById: function(locationId,callbackFunction) {
			var httpRequest = $http.get('/locations/'+locationId);
			httpRequest.success(function(data){
				callbackFunction(data);
			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		}
	};	
		
});