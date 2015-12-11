masterProcessModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.createmasterprocess', {
				url: '/createmasterprocess',
                templateUrl: 'ng-app/masterProcessModule/templates/MasterProcess.html',
                controller: 'masterProcessCtrl'
            })
		});