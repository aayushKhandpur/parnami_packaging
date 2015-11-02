productPlanModule.factory('orderPlanMgr', function (orderSrv,productPlanSrv) {
	
		return {
			createPlan: function(orderPlan,orderPlanId,orderId,getOrderPlan) {
				if(orderPlanId == 'new') {
					orderPlan.created_at = new Date();
					orderPlan.updated_at = new Date();
					orderSrv.getOrderById(orderId,function(orderDetails){
						orderPlan.customer_id = orderDetails.order.customer_id;
						productPlanSrv.insertPlan(orderPlan,function(planInserted){
							getOrderPlan(planInserted);
						});
					});
				}
				else {
					orderPlan.updated_at = new Date();
					productPlanSrv.updatePlan(orderPlan,orderPlanId,function(planInserted){
						getOrderPlan(planInserted);
					});
				}
			},
			createPlanStatus: function(orderPlanStatus,locationName,processName,orderPlanStatusId,getOrderPlanStatus){
				if(orderPlanStatusId == null) {
					orderPlanStatus.created_at = new Date();
					orderPlanStatus.updated_at = new Date();
					//productPlanSrv.getLocations(function(locationDetails){
						//if(locationDetails.length != 0) {
							orderPlanStatus.location_id = 47;
							orderPlanStatus.master_process_name = 'Printing';
							orderPlanStatus.master_process_id = 1;
							productPlanSrv.insertPlanStatus(orderPlanStatus,function(insertedOrderPlanStatus){
								getOrderPlanStatus(insertedOrderPlanStatus);
							});
						//}
					//});
				}
				else {
					orderPlanStatus.updated_at = new Date();
					productPlanSrv.updatePlanStatus(orderPlanStatus,orderPlanStatusId,function(insertedOrderPlanStatus){
						getOrderPlanStatus(insertedOrderPlanStatus);
					});
				}
			},
			loadDefaults : function(orderPlanId,getOrderPlanDetails) {
				var orderPlanStatus = [];
				productPlanSrv.getOrderPlanById(orderPlanId,function(orderPlanDetails){
					console.log('@@@@'+JSON.stringify(orderPlanDetails));
					productPlanSrv.getAllPlanOrderStatus(function(allPlanStatus){
						console.log('@@@@'+JSON.stringify(allPlanStatus));
						for(var counter = 0;counter < allPlanStatus.length; counter++) {
							if(allPlanStatus[counter].order_delivery_plan_process.order_delivery_plan_id == orderPlanId) {
								orderPlanStatus.push(allPlanStatus[counter].order_delivery_plan_process);
								break;
							}
						}
						orderPlanDetails.orderDeliveryPlanStatus = orderPlanStatus;
						getOrderPlanDetails(orderPlanDetails);
					});
				});
			}
		};
		
    });