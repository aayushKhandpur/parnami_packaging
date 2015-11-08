customerModule.config(function ($stateProvider) {
	$stateProvider
		.state('createcustomer', {
			url: '/createcustomer',
			templateUrl: 'ng-app/customerModule/templates/Customer.html',
			controller: 'customerCtrl'
		})
});