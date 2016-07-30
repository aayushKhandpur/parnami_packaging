productPlanModule.service('orderPlanMgr', function (productPlanSrv,masterProcessSrv,locationSrv,productSrv,masterProductSrv,vendorSrv) {

		var self = this;
		this.createPlan = function(orderPlan,getOrderPlan) {
			if(orderPlan.id == null) {
				orderPlan.created_at = new Date();
				orderPlan.updated_at = new Date();
				productPlanSrv.insertPlan(orderPlan,function(planInserted){
					getOrderPlan(planInserted);
				});
			}
			else {
				orderPlan.updated_at = new Date();
				productPlanSrv.updatePlan(orderPlan,function(planInserted){
					getOrderPlan(planInserted);
				});
			}
		}
		this.createPlanStatus = function(orderPlanStatus,getOrderPlanStatus){
			if(orderPlanStatus.id == null) {
				orderPlanStatus.created_at = new Date();
				orderPlanStatus.updated_at = new Date();
				productPlanSrv.insertPlanStatus(orderPlanStatus,function(insertedOrderPlanStatus){
					getOrderPlanStatus(insertedOrderPlanStatus);
				});
			}
			else {
				orderPlanStatus.updated_at = new Date();
				productPlanSrv.updatePlanStatus(orderPlanStatus,function(insertedOrderPlanStatus){
					getOrderPlanStatus(insertedOrderPlanStatus);
				});
			}
		}
		this.loadDefaults = function(orderPlanId,getOrderPlanDetails) {
			productPlanSrv.getOrderPlanById(orderPlanId,function(orderPlanDetails){
				self.getPlanProcessByPlanId(orderPlanId,function(orderPlanStatus) {
					orderPlanDetails.orderDeliveryPlanStatus = orderPlanStatus;
					getOrderPlanDetails(orderPlanDetails);
				});
			});
		}
		this.getPicklistData = function(callbackFunction) {
			locationSrv.getLocations(function(locationDetails) {
				masterProcessSrv.getProcesses(function(processDetails){
					vendorSrv.getLocations(function(vendorDetails) {
						callbackFunction(locationDetails,processDetails,vendorDetails);
					});
				});
			});
		}
		this.getPlanProcessByPlanId = function(planId,callbackFunction) {
			var orderPlanStatus = [];
			productPlanSrv.getDeliveryPlanProcessByPlanId(planId,function(allPlanStatus){
				// for(var counter = 0;counter < allPlanStatus.length; counter++) {
				// 	if(allPlanStatus[counter].order_delivery_plan_process.order_delivery_plan_id == planId) {
				// 		allPlanStatus[counter].order_delivery_plan_process.isEditable = false;
				// 		orderPlanStatus.push(allPlanStatus[counter].order_delivery_plan_process);
				// 	}
				// }
				callbackFunction(allPlanStatus);
			});
		}
		this.deletePlanProcess = function(planProcessId,callbackFunction) {
			productPlanSrv.deletePlanProcess(planProcessId,function(data){
				callbackFunction(data);
			});
		}
		this.getSequenceNumber = function(list) {
			var sequenceNumber = 1;
			if(list.length > 1)
				sequenceNumber = list[list.length - 2].order_delivery_plan_process.sequence_number + 1;
			return sequenceNumber;
		}
		this.getOrderProductsByOrderId = function(orderId,callbackFunction) {
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
					callbackFunction(productNameIdList);
				});
			});
		}

    });
