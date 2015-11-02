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
			validateProductName: function(productName,validateProduct) {
				var masterProduct = [];
				productSrv.getMasterProducts(function(masterProductDetails) {
					for(var counter = 0;counter < masterProductDetails.length; counter++) {
						if(masterProductDetails[counter].master_product.name == productName) {
							masterProduct.push(masterProductDetails[counter].master_product);
							break;
						}
					}
					validateProduct(masterProduct);
				});
			},
			loadDefaults: function(productId,getProductDetails){
				var allPlanList = [];
				productSrv.getProductById(productId,function(productDetails){
					console.log('@#'+JSON.stringify(productDetails));
					masterProductSrv.getMasterProductById(productDetails.order_product.master_product_id,function(masterProductDetails){
						productDetails.productName = masterProductDetails.master_product.name;
						productPlanSrv.getAllPlans(function(allPlans){
							console.log('!@@'+JSON.stringify(allPlans));
							console.log(allPlans[0].order_delivery_plan.order_product_id);
							for(var counter = 0;counter < allPlans.length; counter++) {
								if(allPlans[counter].order_delivery_plan.order_product_id == productId) {
									allPlanList.push(allPlans[counter]);
								}
							}
							console.log('!@@'+JSON.stringify(allPlanList));
							productDetails.productPlanList = allPlanList;
							getProductDetails(productDetails);
						});
					});
				});
			}
		};
		
    });