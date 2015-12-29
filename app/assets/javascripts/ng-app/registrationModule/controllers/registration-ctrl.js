registrationModule.controller('RegistrationCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {

	$scope.registrationModel = {};

	$scope.loginUser = function() {
		$auth.submitLogin($scope.registrationModel)
		.then(function(resp) {
			$location.path("/index/allorders");
			})
		.catch(function(resp) {
	     alert("ERROR");
		});
	};

}]);
