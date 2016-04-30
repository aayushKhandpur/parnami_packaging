transactionModule.controller('processLocationCtrl', function ($scope,$log,$location) {


	$scope.applyChanges = function() {
	   if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
		   $scope.$apply();
	}
	

});
