masterProductModule.config(function ($stateProvider) {
        $stateProvider
            .state('createmasterproduct', {
				url: '/createmasterproduct',
                templateUrl: 'ng-app/masterProductModule/templates/MasterProduct.html',
                controller: 'masterProductCtrl'
            })
		});