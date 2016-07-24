productModule.service('productMgr', function (orderPlanMgr,productSrv,orderSrv,masterProductSrv,productPlanSrv) {

		var self = this;
		this.createProduct = function(newProduct,productId,orderId,getInsertedProduct) {
			if(productId == 'new') {
				newProduct.created_at = new Date();
				newProduct.updated_at = new Date();
				newProduct.order_id = orderId;
				productSrv.insertProduct(newProduct,function(insertedProduct){
					var orderPrice;
					if(insertedProduct.order_product.price == null)
						orderPrice = 0;
					orderPrice = insertedProduct.order_product.price * insertedProduct.order_product.quantity;
					orderSrv.getOrderById(orderId,function(orderDetails){
						orderDetails.order.order_price = orderPrice;
						orderSrv.updateOrder(orderDetails.order,orderId,function(){
							self.createOrderPlan(insertedProduct.order_product,orderDetails.order,function(data){
								getInsertedProduct(insertedProduct);
							});
						});
					});
				});
			}
			else {
				newProduct.updated_at = new Date();
				productSrv.updateProduct(newProduct,function(updatedProduct){
					var orderPrice;
					if(updatedProduct.order_product.price == null)
						orderPrice = 0;
					else
						orderPrice = updatedProduct.order_product.price * updatedProduct.order_product.quantity;
					orderSrv.getOrderById(orderId,function(orderDetails){
						orderDetails.order.order_price = orderPrice;
						orderSrv.updateOrder(orderDetails.order,orderId,function(){
							getInsertedProduct(updatedProduct);
						});
					});
				});
			}
		}
		this.loadDefaults = function(productId,getProductDetails){
			var allPlanList = [];
			productSrv.getProductById(productId,function(productDetails){
				console.log('@#'+JSON.stringify(productDetails));
				getProductDetails(productDetails);
			});
		},
		this.getMasterProducts = function(callbackFunction) {
				masterProductSrv.getMasterProducts(function(allMasterData) {
					callbackFunction(allMasterData);
				});
		}
		this.createOrderPlan = function(product,order,callbackFunction) {
			var orderPlan = {};
			orderPlan.order_id = order.id;
			orderPlan.order_product_id = product.id;
			orderPlan.quantity = product.quantity;
			orderPlan.delivery_date = order.delivery_date;
			orderPlan.customer_id = order.customer_id;
			orderPlanMgr.createPlan(orderPlan,function(data) {
				callbackFunction(data);
			});
		}
		this.validateProduct = function(product) {
			var errorMsg = '';
			if(product.quantity == null || product.quantity.length == 0)
				errorMsg += '<ul><li>Quantity cannot be blank</li></ul>';
			else if(product.quantity <= 0)
				errorMsg += '<ul><li>Quantity must be greater than zero</li></ul>';
			return errorMsg;
		}
    });
