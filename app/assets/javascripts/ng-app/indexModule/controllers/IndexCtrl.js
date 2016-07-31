indexModule.controller('indexCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {

	$auth.validateUser()
	.then(function(resp) {
		$location.path("/index/order/");
	})
	.catch(function(resp) {
		 $location.path("/signin");
	});

	$scope.logOut = function(){
		$auth.signOut()
		.then(function(resp) {
			$location.path("/signin");
		});
	};
}]);
