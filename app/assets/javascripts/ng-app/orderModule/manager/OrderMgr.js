angular.module('orderModule')
    .service('orderMgr', function (orderSrv,utilitySrv,productPlanSrv,productSrv,customerSrv) {
	
		var orderDetails = {};
        var self = this;
		
		this.createOrder = function(newOrder,orderId,getInsertedOrder) {
			if(orderId == 'new') {
				newOrder.order_date =  utilitySrv.getCustomCurrentDate();
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
					//orderDetails.customer = customerDetails;
					productSrv.getProductByOrderId(orderId,function(allProducts) {
						orderDetails.productList = allProducts;
						productPlanSrv.getOrderPlanDeliveryByOrderId(orderId,function(orderDeliveryPlan) {
							orderDetails.orderDeliveryPlanList = orderDeliveryPlan;
							getOrderDetails(orderDetails,customerDetails);
						});
					});
				});
			});
		}
		/*this.getAllProductByOrderId = function(orderId,allProducts) {
			var productList = [];
			for(var counter = 0;counter < allProducts.length;counter++) {
				if(allProducts[counter].order_product.order_id == orderId)
					productList.push(allProducts[counter]);
			}
			//console.log('##'+productList);
			//console.log('##'+JSON.stringify(productList));
			return productList;
		}*/
		this.validateCustomerName = function(customerName,mobNum,getCustomer) {
			productPlanSrv.getCustomerByNameAndMobile(customerName,mobNum,function(customers){
				if(customers.length == 0)
					getCustomer(null);
				else
					getCustomer(customers[0].customer.id);
			});
		}
		this.getAllCustomers = function(callbackFunction) {
			customerSrv.getAllCustomers(function(data){
				callbackFunction(data);
			});
		}
		
    });