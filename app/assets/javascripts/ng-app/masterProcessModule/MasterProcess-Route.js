masterProcessModule.config(function ($stateProvider) {
        $stateProvider
            .state('createmasterprocess', {
				url: '/createmasterprocess',
                templateUrl: 'ng-app/masterProcessModule/templates/MasterProcess.html',
                controller: 'masterProcessCtrl'
            })
		});