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
		},
		insertLocation: function(location,callbackFunction) {
			var httpRequest = $http.post('/locations',location);
			httpRequest.success(function(data){
				callbackFunction(data);

			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		},
		updateLocation: function(locationId,location,callbackFunction) {
			var httpRequest = $http.put('/locations/'+locationId,location);
			httpRequest.success(function(data){
				callbackFunction(data);

			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
		},
    deleteLocation: function(locationId,callbackFunction){
      var httpRequest = $http.delete('/locations/'+locationId);
      httpRequest.success(function(data){
			callbackFunction(data);

			});
			httpRequest.error(function(data){
				console.log(JSON.stringify(data));
			});
    }
	};

});
