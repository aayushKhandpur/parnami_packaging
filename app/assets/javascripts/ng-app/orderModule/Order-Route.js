orderModule.config(function ($stateProvider) {
        $stateProvider
            .state('createorder', {
				url: '/createorder/:orderId',
                templateUrl: 'ng-app/orderModule/templates/CreateOrder.html',
                controller: 'orderCtrl'
            })
			.state('testangular', {
				url: '/testangular',
                templateUrl: 'ng-app/orderModule/templates/TestAngular.html',
                controller: 'orderCtrl'
            })
			
		});