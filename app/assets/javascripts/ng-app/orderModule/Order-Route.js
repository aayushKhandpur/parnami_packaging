orderModule.config(function ($stateProvider) {
        $stateProvider
            .state('createorder', {
				url: '/createorder/:orderId',
                templateUrl: 'ng-app/orderModule/templates/CreateOrder.html',
                controller: 'orderCtrl'
            })
			.state('allorders', {
				url: '/allorders',
                templateUrl: 'ng-app/orderModule/templates/AllOrders.html',
                controller: 'allOrderCtrl'
            })
			
		});