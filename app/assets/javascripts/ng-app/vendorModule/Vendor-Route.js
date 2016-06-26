vendorModule.config(function($stateProvider) {
    $stateProvider
        .state('index.vendor', {
            url: '/vendor',
            templateUrl: 'ng-app/vendorModule/templates/Vendor.html',
            controller: 'vendorCtrl'
        })
        .state('index.vendor.all', {
            url: '/',
            templateUrl: 'ng-app/vendorModule/templates/all_vendors.html'
        })
        .state('index.vendor.create', {
            url: '/create',
            templateUrl: 'ng-app/vendorModule/templates/add_vendor.html'
        })
        .state('index.vendor.edit', {
            url: '/:vendorId',
            templateUrl: 'ng-app/vendorModule/templates/edit_vendor.html',
            controller: 'vendorDetailsCtrl',
            resolve: {
                vendorId: ['$stateParams', function($stateParams) {
                    return $stateParams['vendorId'];
                }]
            }
        })
});
