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
        .state('index.order.summary.create', {
            url: '/',
            templateUrl: 'ng-app/orderModule/templates/create_order.html',
            resolve: {
              orderId: ['$stateParams',function($stateParams){
                return $stateParams['orderId'];
              }]
            }
        })
        .state('index.order.summary.create.order', {
            url: '/order',
            templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
        })
        .state('index.order.summary.screate.product', {
            url: '/product',
            templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
        })
        .state('index.order.summary', {
            url: '/:orderId',
            templateUrl: 'ng-app/orderModule/templates/summary.html',
            controller: 'orderDetailCtrl',
            resolve: {
              orderId: ['$stateParams',function($stateParams){
                return $stateParams['orderId'];
              }]
            }
        })

});
