masterProductModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.createmasterproduct', {
				url: '/createmasterproduct',
                templateUrl: 'ng-app/masterProductModule/templates/MasterProduct.html',
                controller: 'masterProductCtrl'
            })
		});