productModule.service('productMgr', function (orderPlanMgr,productSrv,orderSrv,masterProductSrv,productPlanSrv) {
        
		var self = this;
		this.createProduct = function(newProduct,productId,orderId,getInsertedProduct) {
			if(productId == 'new') {
				newProduct.created_at = new Date();
				newProduct.updated_at = new Date();
				newProduct.order_id = orderId;
				productSrv.insertProduct(newProduct,function(insertedProduct){
					var orderPrice = insertedProduct.order_product.price_per_piece * insertedProduct.order_product.quantity;
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
					var orderPrice = updatedProduct.order_product.price_per_piece * updatedProduct.order_product.quantity;
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
			else if(parseInt(product.quantity) != product.quantity)
				errorMsg += '<ul><li>Quantity must be Integer value</li></ul>';
			else if(product.quantity <= 0)
				errorMsg += '<ul><li>Quantity must be greater than zero</li></ul>';
			if(product.price_per_kg == null || product.price_per_kg.length == 0)
				errorMsg += '<ul><li>Price Per Kg cannot be blank</li></ul>';
			else if(parseFloat(product.price_per_kg) != product.price_per_kg)
				errorMsg += '<ul><li>Price Per Kg must be numeric</li></ul>';
			if(product.price_per_piece == null || product.price_per_piece.length == 0)
				errorMsg += '<ul><li>Price Per Piece cannot be blank</li></ul>';
			else if(parseFloat(product.price_per_piece) != product.price_per_piece)
				errorMsg += '<ul><li>Price Per Piece must be numeric</li></ul>';
			if(product.size == null || product.size.length == 0)
				errorMsg += '<ul><li>Product Size cannot be blank</li></ul>';
			if(product.color == null || product.color.length == 0)
				errorMsg += '<ul><li>Product Color cannot be blank</li></ul>';
			return errorMsg;
		}
    });