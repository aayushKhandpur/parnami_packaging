locationModule.service('locationMgr', function (locationSrv) {

	var self = this;

	this.getLocations = function(callbackFunction) {
		locationSrv.getLocations(function(allLocations) {
			self.allLocations = allLocations;
			callbackFunction(allLocations);
		});
	}
	this.createLocation = function(locationId,location,callbackFunction) {
		if(locationId == null) {
			location.created_at = new Date();
			location.updated_at = new Date();
			locationSrv.insertLocation(location,function(data) {
				callbackFunction(data);
			});
		}
		else {
			location.updated_at = new Date();
			locationSrv.updateLocation(locationId,location,function(data) {
				callbackFunction(data);
			});
		}
	}

	this.deleteLocation = function(locationId,callbackFunction){
		locationSrv.deleteLocation(locationId,function(data) {
			callbackFunction();
		})
	}

	this.getLocationById = function(locationId,callbackFunction){
		locationSrv.getLocationById(locationId,function(data) {
			callbackFunction(data.location);
		})
	}
});
