angular
    .module('AngularRails', [
        'ngRoute',
        'templates',
		'ui.router'
    ]).config(function ($routeProvider, $stateProvider) {
        $stateProvider
            .state('createorder', {
				url: '/createorder',
                templateUrl: 'ng-app/templates/CreateOrder.html',
                controller: 'HomeCtrl'
            });
		$stateProvider
            .state('orderproducts', {
				url: '/orderproducts',
                templateUrl: 'ng-app/templates/CreateOrderProducts.html',
                controller: 'HomeCtrl'
            });
		$stateProvider
            .state('productprocessplan', {
				url: '/productprocessplan',
                templateUrl: 'ng-app/templates/CreateProcessPlan.html',
                controller: 'HomeCtrl'
            });
			$stateProvider
            .state('testangular', {
				url: '/testangular',
                templateUrl: 'ng-app/templates/TestAngular.html',
                controller: 'HomeCtrl'
            });
    });