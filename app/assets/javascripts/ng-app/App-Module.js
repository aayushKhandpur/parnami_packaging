var parnamiPackaging = angular.module('AngularRails', ['ngRoute',
        'templates',
		'ui.router',
		'orderModule',
		'UtilityModule',
		'productModule',
		'productPlanModule',
		'masterProductModule',
		'locationModule',
		'masterProcessModule'
    ]);
	
	parnamiPackaging.config(function ($stateProvider,$httpProvider) {
		 
        $stateProvider
            .state('welcome', {
				url: '/',
                templateUrl: 'ng-app/WelcomePage.html',
                controller: 'HomeCtrl'
            })
			
		});
		
		parnamiPackaging.config(['$httpProvider',function($httpProvider) {
  var authToken;
  authToken = $("meta[name=\"csrf-token\"]").attr("content");
  return $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
}]);