vendorModule.config(function ($stateProvider) {
        $stateProvider
            .state('createvendor', {
				url: '/createvendor',
                templateUrl: 'ng-app/vendorModule/templates/Vendor.html',
                controller: 'vendorCtrl'
            })
		});