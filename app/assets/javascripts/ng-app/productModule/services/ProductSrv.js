productModule.factory('productSrv', function ($http) {
        
		return {
		
			insertProduct: function(newProduct,getResponseData) {
			
				var httpRequest = $http.post('/order_products',newProduct);
				httpRequest.success(function(data){
					getResponseData(data);
				
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			updateProduct: function(updatedProduct,getResponseData) {
				var httpRequest = $http.put('/order_products/'+updatedProduct.id,updatedProduct);
				httpRequest.success(function(data){
					getResponseData(data);
				
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getAllProduct: function(getAllStoredProducts) {
				var httpRequest = $http.get('/order_products');
				httpRequest.success(function(data){
					getAllStoredProducts(data);
				
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getProductById: function(productId,getProduct) {
				var httpRequest = $http.get('/order_products/'+productId);
				httpRequest.success(function(data){
					getProduct(data);
				
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getMasterProducts: function(getMasterProduct) {
				var httpRequest = $http.get('/master_products');
				httpRequest.success(function(data){
					getMasterProduct(data);
				
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			},
			getProductByOrderId: function(orderId,callbackFunction) {
				var httpRequest = $http.get('/order_products_custom/'+orderId);
				httpRequest.success(function(data){
					callbackFunction(data);
				
				});
				httpRequest.error(function(data){
					console.log(JSON.stringify(data));
				});
			}
		};	
		
    });