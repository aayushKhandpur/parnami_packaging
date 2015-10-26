var parnamiPackaging = angular.module('AngularRails', ['ngRoute',
        'templates',
		'ui.router',
		'orderModule',
		'UtilityModule',
		'productModule',
		'productPlanModule'
    ]);
	
	parnamiPackaging.config(function ($stateProvider) {
        $stateProvider
            .state('welcome', {
				url: '/',
                templateUrl: 'ng-app/WelcomePage.html',
                controller: 'HomeCtrl'
            })
			
		});