productModule.config(function ($stateProvider) {
        $stateProvider
            .state('neworderproducts', {
				url: '/orderproducts/:orderId/:productId',
                templateUrl: 'ng-app/productModule/templates/CreateOrderProducts.html',
                controller: 'productCtrl'
            })
			
		});