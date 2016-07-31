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

	this.validateVendor = function(vendor){
		var errorMsg = '';
		if(vendor.mobile_number == null || vendor.mobile_number.length == 0)
			errorMsg += "<ul><li>Mobile Number can't be blank</li></ul>" ;
			return errorMsg;
	}


		this.getVendorById = function(vendorId,callbackFunction){
			vendorSrv.getVendorById(vendorId,function(data) {
				callbackFunction(data.vendor);
			})
		}

});
