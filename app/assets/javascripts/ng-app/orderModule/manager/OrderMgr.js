angular.module('orderModule')
    .service('orderMgr', function (orderSrv,utilitySrv,productPlanSrv,productSrv,customerSrv,orderPlanMgr) {
	
		var orderDetails = {};
        var self = this;
		
		this.createOrder = function(newOrder,orderId,getInsertedOrder) {
			if(orderId == 'new') {
				newOrder.order_date =  newOrder.delivery_date;
				newOrder.created_at = new Date();
				newOrder.updated_at = new Date();
				newOrder.order_price = 0.00;
				orderSrv.insertOrder(newOrder,function(insertedOrder){
					getInsertedOrder(insertedOrder);
				});
			}
			else {
				newOrder.updated_at = new Date();
				orderSrv.updateOrder(newOrder,orderId,function(insertedOrder){
					getInsertedOrder(insertedOrder);
				});
			}
		}
		this.loadDefaults = function(orderId,getOrderDetails) {
			orderSrv.getOrderById(orderId,function(orderRequested){
				orderDetails.orderProperty = orderRequested;
				productPlanSrv.getCustomerById(orderRequested.order.customer_id,function(customerDetails){
					productSrv.getProductByOrderId(orderId,function(allProducts) {
						orderDetails.productList = allProducts;
						self.getOrderPlanByOrderId(orderId,function(orderPlanList) {
							orderDetails.orderDeliveryPlanList = orderPlanList;
							getOrderDetails(orderDetails,customerDetails);
						});
					});
				});
			});
		}
		
		this.getOrderPlanByOrderId =  function(orderId,callbackFunction) {
			var allPrderPlans = [];
			productPlanSrv.getOrderPlanDeliveryByOrderId(orderId,function(orderDeliveryPlan) {
				for(var counter = 0;counter < orderDeliveryPlan.length; counter++) {
					orderDeliveryPlan[counter].order_delivery_plan.isEditable = false;
					allPrderPlans.push(orderDeliveryPlan[counter].order_delivery_plan);
				}
				callbackFunction(allPrderPlans);
			});
		}
		
		this.getAllCustomers = function(callbackFunction) {
			customerSrv.getAllCustomers(function(data){
				callbackFunction(data);
			});
		}
		
		this.getCustomerByIdFromList = function(customerId,list) {
			var customer = {};
			for(var counter = 0;counter < list.length; counter++) {
				if(list[counter].id == customerId) {
					customer = list[counter];
					break;
				}
			}
			return customer;
		}
		
		this.getOrderProductById = function(orderId,callbackFunction) {
			orderPlanMgr.getOrderProductsByOrderId(orderId,function(data) {
				callbackFunction(data);
			});
		}
		
		this.createOrderPlan = function(orderPlan,callbackFunction) {
			orderPlanMgr.createPlan(orderPlan,function(data) {
				callbackFunction(data);
			});
		}
		
		this.validateOrder = function(order) {
			var errorMsg = '';
			if(order.delivery_address == null || order.delivery_address.length == 0)
				errorMsg += '<ul><li>Billing Address cannot be empty</li></ul>' ;
			if(order.delivery_date == null || order.delivery_date.length == 0)
				errorMsg += '<ul><li>Delivery Date cannot be empty.</li></ul>' ;
			if(order.order_details == null || order.order_details.length == 0)
				errorMsg += '<ul><li>Order Details cannot be empty.</li></ul>' ;
			return errorMsg;
		}
		
		this.validateOrderPlan = function(orderPlan,productList,callbackFunction) {
			var errorMsg = '';
			var maximumQuantity;
			var currentQuantity = 0;
			for(var counter = 0; counter < productList.length; counter++) {
				if(orderPlan.order_product_id == productList[counter].order_product.id) {
					maximumQuantity = productList[counter].order_product.quantity;
				}
			}
			productPlanSrv.getProductPlanByProductId(orderPlan.order_product_id,function(allPlans) {
				for(var counter = 0;counter < allPlans.length ; counter++) {
					if(orderPlan.id != null && orderPlan.id == allPlans[counter].order_delivery_plan.id)
						continue;
					currentQuantity += allPlans[counter].order_delivery_plan.quantity;
				}
				var quantityToSave = parseInt(orderPlan.quantity) + currentQuantity;
				console.log('current quantity'+currentQuantity);
				console.log('maximum quantity'+maximumQuantity);
				console.log('order plan quantity'+orderPlan.quantity);
				console.log('quantityToSave'+quantityToSave);
				if(orderPlan.delivery_date == null || orderPlan.delivery_date.length == 0)
					errorMsg += '<ul><li>Delivery Date cannot be empty</li></ul>' ;
				if(orderPlan.quantity == null || orderPlan.quantity.length == 0)
					errorMsg += '<ul><li>Quantity cannot be empty</li></ul>' ;
				else if(parseInt(orderPlan.quantity) != orderPlan.quantity)
					errorMsg += '<ul><li>Quantity must be Integer value</li></ul>';
				else if(orderPlan.quantity <= 0)
					errorMsg += '<ul><li>Quantity must be greater than zero</li></ul>';
				else if(quantityToSave > maximumQuantity)
					errorMsg += '<ul><li>Quantity must be less than product quantity to be delivered</li></ul>';
				callbackFunction(errorMsg);
			});
		}
		
    });