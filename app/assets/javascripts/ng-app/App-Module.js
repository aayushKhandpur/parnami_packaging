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
		'angularUtils.directives.dirPagination'
    ]);
	
	parnamiPackaging.config(function ($stateProvider,$httpProvider) {
		 
        $stateProvider
		.state("index", {
				url: '/index',
                templateUrl: 'ng-app/WelcomePage.html',
                controller: 'HomeCtrl'
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