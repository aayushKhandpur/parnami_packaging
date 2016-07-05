productPlanModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.productprocessplan', {
				url: '/order/:orderId/order-products/:productId/delivery-plans/:orderPlanId/process',
                templateUrl: 'ng-app/productPlanModule/templates/CreateProcessPlan.html',
                controller: 'productPlanCtrl'
            })

		});
