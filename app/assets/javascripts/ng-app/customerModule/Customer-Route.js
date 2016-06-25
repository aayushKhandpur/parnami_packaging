customerModule.config(function ($stateProvider) {
	$stateProvider
		.state('index.customers', {
			url: '/customers',
			templateUrl: 'ng-app/customerModule/templates/Customer.html',
			controller: 'customerCtrl'
		})
		.state('index.customers.create', {
			url: '/create',
			templateUrl: 'ng-app/customerModule/templates/customer_create.html',
		})
		.state('index.customers.edit', {
			url: '/{{master.id}}',
			templateUrl: 'ng-app/customerModule/templates/customer_edit.html',
		})
		.state('index.customers.all', {
			url: '/',
			templateUrl: 'ng-app/customerModule/templates/all_customers.html',
		})
});
