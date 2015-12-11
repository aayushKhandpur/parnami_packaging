locationModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.createlocation', {
				url: '/createlocation',
                templateUrl: 'ng-app/locationModule/templates/Location.html',
                controller: 'locationCtrl'
            })
		});