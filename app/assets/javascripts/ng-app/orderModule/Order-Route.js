orderModule.config(function($stateProvider) {
    $stateProvider
        .state('index.order', {
            url: '/order',
            templateUrl: 'ng-app/orderModule/templates/order.html',

        })
        .state('index.order.all', {
            url: '/',
            templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
            controller: 'allOrderCtrl'
        })
        .state('index.order.create', {
            url: '/:orderId',
            templateUrl: 'ng-app/orderModule/templates/create_order.html',
            controller: 'orderCtrl'
        })
        .state('index.order.create.order', {
            url: '/order',
            templateUrl: 'ng-app/orderModule/templates/new_order.html',
        })
        .state('index.order.create.order_product', {
            url: '/order_product',
            templateUrl: 'ng-app/orderModule/templates/order_product.html',
        })
        .state('index.order.create.order_delivery', {
            url: '/order_delivery',
            templateUrl: 'ng-app/orderModule/templates/order_delivery.html',
        })
        .state('index.order.create.order_transaction', {
            url: '/order_transaction',
            templateUrl: 'ng-app/orderModule/templates/order_transactions.html',
        })
        .state('index.order.summary', {
            url: '/summary/:orderId',
            templateUrl: 'ng-app/orderModule/templates/summary.html',
            controller: 'orderDetailCtrl',
            resolve: {
              orderId: ['$stateParams',function($stateParams){
                return $stateParams['orderId'];
              }]
            }
        })

        // .state('index.order.summary.create.order', {
        //     url: '/order',
        //     templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
        // })
        // .state('index.order.summary.create.product', {
        //     url: '/product',
        //     templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
        // })


});
