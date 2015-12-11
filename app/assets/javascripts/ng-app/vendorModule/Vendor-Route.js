vendorModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.createvendor', {
				url: '/createvendor',
                templateUrl: 'ng-app/vendorModule/templates/Vendor.html',
                controller: 'vendorCtrl'
            })
		});