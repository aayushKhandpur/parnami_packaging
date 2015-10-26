productPlanModule.config(function ($stateProvider) {
        $stateProvider
            .state('productprocessplan', {
				url: '/productprocessplan',
                templateUrl: 'ng-app/productPlanModule/templates/CreateProcessPlan.html',
                controller: 'productPlanCtrl'
            })
			
		});