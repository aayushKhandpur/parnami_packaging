locationModule.config(function ($stateProvider) {
        $stateProvider
            .state('createlocation', {
				url: '/createlocation',
                templateUrl: 'ng-app/locationModule/templates/Location.html',
                controller: 'locationCtrl'
            })
		});