registrationModule.controller('RegistrationCtrl', ['$scope', '$location', '$auth','$http','$log', function ($scope, $location, $auth,$http,$log) {

	$scope.registrationModel = {};

	$scope.loginUser = function() {
		$auth.submitLogin($scope.registrationModel)
		.then(function(resp) {
			//$log.info(JSON.stringify(resp));
			var http = $http.get('/getUserRole/'+resp.id);
			http.success(function(successData){
					$log.info(JSON.stringify(successData));
					var role = successData.c.role;
					if(role.name == 'Admin'|| role.name == 'admin' ){
						$location.path("/index/allorders");
					}
					else if(role.name == 'Guest' || role.name == 'guest'){
						$location.path("/signup");
					}
			});

			})
		.catch(function(resp) {
	     alert("ERROR");
		});
	};

	$scope.navigateToRegisterPage = function()
	{
		$location.path('/signup');
	}

}]);
