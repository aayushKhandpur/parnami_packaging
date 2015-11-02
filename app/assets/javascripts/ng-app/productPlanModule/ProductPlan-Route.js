productPlanModule.config(function ($stateProvider) {
        $stateProvider
            .state('productprocessplan', {
				url: '/productprocessplan/:orderId/:productId/:orderPlanId',
                templateUrl: 'ng-app/productPlanModule/templates/CreateProcessPlan.html',
                controller: 'productPlanCtrl'
            })
			
		});