orderModule.config(function($stateProvider) {
    $stateProvider
        .state('index.order', {
            url: '/order',
            templateUrl: 'ng-app/orderModule/templates/order.html',
            controller: 'orderCtrl'
        })
        .state('index.order.all', {
            url: '/',
            templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
            controller: 'allOrderCtrl'
        })
        .state('index.order.create', {
            url: '/create',
            templateUrl: 'ng-app/orderModule/templates/create_order.html',
        })
        .state('index.order.create.order', {
            url: '/',
            templateUrl: 'ng-app/orderModule/templates/create_order.html',
        })
        .state('index.order.create.order_product', {
            url: '/:orderId/order_product',
            templateUrl: 'ng-app/orderModule/templates/create_order.html',
        })
        .state('index.order.create.order_delievery', {
            url: '/create',
            templateUrl: 'ng-app/orderModule/templates/create_order.html',
        })
        // .state('index.order.summary', {
        //     url: '/:orderId',
        //     templateUrl: 'ng-app/orderModule/templates/summary.html',
        //     controller: 'orderDetailCtrl',
        //     resolve: {
        //       orderId: ['$stateParams',function($stateParams){
        //         return $stateParams['orderId'];
        //       }]
        //     }
        // })

        // .state('index.order.summary.create.order', {
        //     url: '/order',
        //     templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
        // })
        // .state('index.order.summary.create.product', {
        //     url: '/product',
        //     templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
        // })


});
