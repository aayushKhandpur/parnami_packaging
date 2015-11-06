productModule.factory('productMgr', function (productSrv,orderSrv,masterProductSrv,productPlanSrv) {
        
		return {
		
			createProduct: function(newProduct,productId,orderId,getInsertedProduct) {
				if(productId == 'new') {
					newProduct.created_at = new Date();
					newProduct.updated_at = new Date();
					newProduct.order_id = orderId;
					productSrv.insertProduct(newProduct,function(insertedProduct){
						console.log('@!!'+JSON.stringify(insertedProduct));
						var orderPrice = insertedProduct.order_product.price_per_piece * insertedProduct.order_product.quantity;
						orderSrv.getOrderById(orderId,function(orderDetails){
							orderDetails.order.order_price = orderPrice;
							orderSrv.updateOrder(orderDetails.order,orderId,function(){
								getInsertedProduct(insertedProduct);
							});
						});
					});
				}
				else {
					newProduct.updated_at = new Date();
					productSrv.updateProduct(newProduct,function(updatedProduct){
						getInsertedProduct(updatedProduct);
					});
				}
			},
			loadDefaults: function(productId,getProductDetails){
				var allPlanList = [];
				productSrv.getProductById(productId,function(productDetails){
					console.log('@#'+JSON.stringify(productDetails));
					getProductDetails(productDetails);
				});
			},
			getMasterProducts : function(callbackFunction) {
					masterProductSrv.getMasterProducts(function(allMasterData) {
						callbackFunction(allMasterData);
					});
			}
		};
		
    });