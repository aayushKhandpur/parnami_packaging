var parnamiPackaging = angular.module('AngularRails', [
        'templates',
		'ui.router',
		'ui',
		'indexModule',
    'ng-token-auth',
		'orderModule',
		'UtilityModule',
		'productModule',
		'productPlanModule',
		'masterProductModule',
		'locationModule',
		'masterProcessModule',
		'customerModule',
		'vendorModule',
    'registrationModule',
    'transactionModule',
		'angularUtils.directives.dirPagination',
    'valdr'
    ]);

	parnamiPackaging.config(function ($stateProvider,$httpProvider, $authProvider) {

    $authProvider.configure({
      apiUrl: '.'
      //confirmationSuccessUrl: location.origin + '/#/profile',
      //passwordResetSuccessUrl: location.origin + '/#/reset-password'
    });


        $stateProvider
		.state("index", {
				url: '/index',
                templateUrl: 'ng-app/indexModule/templates/Index.html',
                controller: 'indexCtrl'
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
