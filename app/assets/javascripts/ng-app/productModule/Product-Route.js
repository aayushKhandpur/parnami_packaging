productModule.config(function($stateProvider) {
    $stateProvider
        .state('index.neworderproducts', {
            url: '/order/:orderId/orderproducts/:productId',
            templateUrl: 'ng-app/productModule/templates/CreateOrderProducts.html',
            controller: 'productCtrl'
        })

});
