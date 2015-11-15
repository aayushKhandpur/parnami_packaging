vendorModule.service('vendorMgr', function (vendorSrv) {
	
	var self = this;
	
	this.getLocations = function(callbackFunction) {
		vendorSrv.getLocations(function(allLocations) {
			self.allLocations = allLocations;
			callbackFunction(allLocations);
		});
	}
	this.createLocation = function(locationId,location,callbackFunction) {
		if(locationId == null) {
			location.created_at = new Date();
			location.updated_at = new Date();
			vendorSrv.insertLocation(location,function(data) {
				console.log(JSON.stringify(data));
				callbackFunction(data);
			});
		}
		else {
			location.updated_at = new Date();
			vendorSrv.updateLocation(locationId,location,function(data) {
				callbackFunction(data);
			});
		}
	}
});