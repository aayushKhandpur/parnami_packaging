masterProcessModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.masterprocess', {
				          url: '/process',
                templateUrl: 'ng-app/masterProcessModule/templates/MasterProcess.html',
                controller: 'masterProcessCtrl'
            })
            .state('index.masterprocess.all', {
				          url: '/',
                templateUrl: 'ng-app/masterProcessModule/templates/all_process.html'
            })
            .state('index.masterprocess.create', {
				          url: '/create',
                templateUrl: 'ng-app/masterProcessModule/templates/add_process.html'
            })
            .state('index.masterprocess.edit', {
				          url: '/:processId',
                templateUrl: 'ng-app/masterProcessModule/templates/edit_process.html',
                controller: 'masterProcessDetailCtrl',
                resolve: {
                  processId: ['$stateParams',function($stateParams){
                    return $stateParams['processId'];
                  }],
                }
            })
		});
