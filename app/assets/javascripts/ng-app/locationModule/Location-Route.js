locationModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.locations', {
				        url: '/locations',
                templateUrl: 'ng-app/locationModule/templates/Location.html',
                controller: 'locationCtrl'
            })
            .state('index.locations.all', {
                url: '/',
                templateUrl: 'ng-app/locationModule/templates/all_location.html'
            })
            .state('index.locations.create', {
                url: '/create',
                templateUrl: 'ng-app/locationModule/templates/add_location.html'
            })
            .state('index.locations.edit', {
                url: '/:locationId',
                templateUrl: 'ng-app/locationModule/templates/edit_location.html',
                controller: 'locationDetailsCtrl',
                resolve: {
                  locationId: ['$stateParams',function($stateParams){
                    return $stateParams['locationId'];
                  }]
                }
            })
		});
