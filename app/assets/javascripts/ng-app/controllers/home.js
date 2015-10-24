angular.module('AngularRails')
    .controller('HomeCtrl', function ($scope,$http) {
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!'];
		$scope.sampleValue = 'Angular Worked';
		$scope.checkService = function() { 
			$http.get('/locations')
			.success(function(data){
				console.log('##'+data);
			})
			.error(function(data){
				console.log('error'+data);
			});
		}
    });