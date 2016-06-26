masterProductModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.masterproduct', {
				          url: '/product',
                templateUrl: 'ng-app/masterProductModule/templates/MasterProduct.html',
                controller: 'masterProductCtrl'
            })
            .state('index.masterproduct.all', {
                  url: '/',
                  templateUrl: 'ng-app/masterProductModule/templates/all_product.html',
            })
            .state('index.masterproduct.create', {
                  url: '/create',
                templateUrl: 'ng-app/masterProductModule/templates/add_product.html',
            })
            .state('index.masterproduct.edit', {
                  url: '/:productId',
                templateUrl: 'ng-app/masterProductModule/templates/edit_product.html',
                controller: 'masterProductDetailsCtrl',
                resolve: {
                  productId: ['$stateParams',function($stateParams){
                    return $stateParams['productId'];
                  }]
                }
            })
		});
