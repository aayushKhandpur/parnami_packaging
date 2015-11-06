productPlanModule.factory('orderPlanMgr', function (orderSrv,productPlanSrv,masterProcessSrv,locationSrv,productSrv,masterProductSrv) {
	
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
			createPlanStatus: function(orderPlanStatus,orderPlanStatusId,getOrderPlanStatus){
				if(orderPlanStatusId == null) {
					orderPlanStatus.created_at = new Date();
					orderPlanStatus.updated_at = new Date();
					productPlanSrv.insertPlanStatus(orderPlanStatus,function(insertedOrderPlanStatus){
						getOrderPlanStatus(insertedOrderPlanStatus);
					});
				}
				else {
					orderPlanStatus.updated_at = new Date();
					productPlanSrv.updatePlanStatus(orderPlanStatus,orderPlanStatusId,function(insertedOrderPlanStatus){
						getOrderPlanStatus(insertedOrderPlanStatus);
					});
				}
			},
			loadDefaults: function(orderPlanId,getOrderPlanDetails) {
				var orderPlanStatus = [];
				productPlanSrv.getOrderPlanById(orderPlanId,function(orderPlanDetails){
					console.log('@@@@'+JSON.stringify(orderPlanDetails));
					productPlanSrv.getAllPlanOrderStatus(function(allPlanStatus){
						console.log('@@@@'+JSON.stringify(allPlanStatus));
						for(var counter = 0;counter < allPlanStatus.length; counter++) {
							if(allPlanStatus[counter].order_delivery_plan_process.order_delivery_plan_id == orderPlanId) {
								orderPlanStatus.push(allPlanStatus[counter].order_delivery_plan_process);
							}
						}
						orderPlanDetails.orderDeliveryPlanStatus = orderPlanStatus;
						getOrderPlanDetails(orderPlanDetails);
					});
				});
			},
			validateLocationAndProcess: function(locationName,processName,validateResult) {
				var validationDetails = {};
				validationDetails.isLocationPresent = false;
				validationDetails.isValid = false;
				validationDetails.isProcessPresent = false;
				locationSrv.getLocations(function(locationDetails){
					for(var counter = 0; counter < locationDetails.length ; counter++) {
						if(locationDetails[counter].location.name == locationName) {
							validationDetails.locationId = locationDetails[counter].location.id;
							validationDetails.isLocationPresent = true;
							break;
						}
					}
					masterProcessSrv.getProcesses(function(processDetails){
						for(var counter = 0; counter < processDetails.length ; counter++) {
							if(processDetails[counter].master_process.name == processName) {
								validationDetails.masterProcessId = processDetails[counter].master_process.id;
								validationDetails.isProcessPresent = true;
								if(validationDetails.isLocationPresent == true)
									validationDetails.isValid = true;
								break;
							}
						}
						validateResult(validationDetails);
					});
				});		
			},
			getPicklistData: function(orderId,callbackFunction) {
				var productNameIdList = [];
				productSrv.getProductByOrderId(orderId,function(orderProducts) {
					masterProductSrv.getMasterProducts(function(masterProducts) {
							for(var outerCounter = 0;outerCounter < orderProducts.length; outerCounter++) {
									for(var innerCounter = 0;innerCounter < masterProducts.length; innerCounter++) {
										if(orderProducts[outerCounter].order_product.master_product_id == masterProducts[innerCounter].master_product.id) {
											var productNameAndId = {};
											productNameAndId.productName = masterProducts[innerCounter].master_product.name;
											productNameAndId.productId = orderProducts[outerCounter].order_product.id;
											productNameIdList.push(productNameAndId);
										}
									}
							}
							locationSrv.getLocations(function(locationDetails) {
								masterProcessSrv.getProcesses(function(processDetails){
									callbackFunction(productNameIdList,locationDetails,processDetails);
								});
							});
							
					});
				});
			}
		};
		
    });