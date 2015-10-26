angular.module('orderModule')
    .factory('orderMgr', function (orderSrv,utilitySrv) {
        
		return {
		
			createOrder: function createOrder(newOrder) {
				
				newOrder.order_date =  utilitySrv.getCustomCurrentDate();
				newOrder.created_at = new Date();
				newOrder.updated_at = new Date();
				orderSrv.insertOrder(newOrder);
			}
		};
		
    });