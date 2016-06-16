orderModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.createorder', {
				url: '/createorder/:orderId',
                templateUrl: 'ng-app/orderModule/templates/CreateOrder.html',
                controller: 'orderCtrl'
            })
			.state('index.allorders', {
				url: '/allorders',
                templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
                controller: 'allOrderCtrl'
            })
            .state('index.summary', {
              url: '/summary/:orderId',
                      templateUrl: 'ng-app/orderModule/templates/summary.html',
                      controller: 'orderCtrl'
                  })

		});
