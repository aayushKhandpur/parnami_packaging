masterProductModule.factory('masterProductSrv', function ($http) {
        
		return {
			
			getMasterProductById: function(masterProductId,getMasterProduct) {
				var httpRequest = $http.get('/master_products/'+masterProductId);
				httpRequest.success(function(data){
					getMasterProduct(data);
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			}
			
			
		};	
		
    });