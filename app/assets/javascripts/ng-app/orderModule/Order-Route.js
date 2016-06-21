orderModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.createorder', {
				url: '/createorder/:orderId',
                templateUrl: 'ng-app/orderModule/templates/CreateOrder.html',
                controller: 'orderCtrl'
            })
			.state('index.orders', {
				url: '/orders',
                templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
                controller: 'allOrderCtrl'
            })
            .state('index.summary', {
              url: '/orders/:orderId',
                      templateUrl: 'ng-app/orderModule/templates/summary.html',
                      controller: 'orderCtrl'
                  })

		});
