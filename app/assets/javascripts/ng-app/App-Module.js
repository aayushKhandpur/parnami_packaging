var parnamiPackaging = angular.module('AngularRails', [
        'templates',
		'ui.router',
		'ui',
		'orderModule',
		'UtilityModule',
		'productModule',
		'productPlanModule',
		'masterProductModule',
		'locationModule',
		'masterProcessModule',
		'customerModule',
		'vendorModule',
		'angularUtils.directives.dirPagination',
     'ng-token-auth'
    ]);

	parnamiPackaging.config(function ($stateProvider,$httpProvider) {

        $stateProvider
        		.state("index", {
        				url: '/index',
                templateUrl: 'ng-app/WelcomePage.html',
                controller: 'HomeCtrl'
            })
            .state('signin', {
                url: "/signin",
                controller: "RegistrationCtrl",
                templateUrl: "app/registration/views/registration.html"
              })

		});

		parnamiPackaging.filter("sanitize", ['$sce', function($sce) {
			return function(htmlCode){
				return $sce.trustAsHtml(htmlCode);
			}
		}]);

		parnamiPackaging.config(['$httpProvider',function($httpProvider) {
  var authToken;
  authToken = $("meta[name=\"csrf-token\"]").attr("content");
  return $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
}]);
