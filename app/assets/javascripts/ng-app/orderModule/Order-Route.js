orderModule.config(function ($stateProvider) {
        $stateProvider
            .state('createorder', {
				url: '/createorder',
                templateUrl: 'ng-app/orderModule/templates/CreateOrder.html',
                controller: 'orderCtrl'
            })
			
		});