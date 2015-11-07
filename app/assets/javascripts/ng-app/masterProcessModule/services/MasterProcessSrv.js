masterProcessModule.service('masterProcessSrv', function ($http) {

	//this.allMasterProcess = [];
	var self = this;
        
	this.getProcesses = function(callbackFunction) {
		var httpRequest = $http.get('/master_processes');
		httpRequest.success(function(data){
			callbackFunction(data);
		});
		httpRequest.error(function(data){
			console.log(JSON.stringify(data));
		});
	}
	this.getProcessById = function(processId,callbackFunction) {
		var httpRequest = $http.get('/master_processes/'+processId);
		httpRequest.success(function(data){
			callbackFunction(data);
		});
		httpRequest.error(function(data){
			console.log(JSON.stringify(data));
		});
	}	
});