angular.module('orderModule')
    .factory('orderSrv', function ($http) {
        
		return {
		
			insertOrder: function(newOrder) {
			
				console.log('###'+JSON.stringify(newOrder));
			
			}
			
		};
		
		
    });