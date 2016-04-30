registrationModule.controller('NewUserCtrl', ['$scope', '$location', '$auth','$log','$http', function ($scope, $location, $auth,$log,$http) {

	$scope.registrationForm = {};
	$scope.uRole;

	$scope.registerUser = function() {

		$auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
          $log.info('Success...!!!'+JSON.stringify(resp));
					$http.get('/addRolesToUsers/'+resp.data.data.id+'/'+$scope.uRole);
					$.toaster({ priority : 'success', title : 'Info', message : 'User Created SuccessFully',width:'100%'});
					$location.path("/index/allorders");
        })
        .catch(function(resp) {
            $log.info('Failure...!!!'+JSON.stringify(resp));
        });
	}

}]);
