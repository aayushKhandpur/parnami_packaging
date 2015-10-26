productModule.config(function ($stateProvider) {
        $stateProvider
            .state('orderproducts', {
				url: '/orderproducts',
                templateUrl: 'ng-app/productModule/templates/CreateOrderProducts.html',
                controller: 'productCtrl'
            })
			
		});