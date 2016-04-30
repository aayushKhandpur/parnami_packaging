transactionModule.config(function ($stateProvider) {
        $stateProvider
            .state('index.processonelocation', {
				url: '/processonelocation',
                templateUrl: 'ng-app/orderTransactionModule/templates/ProcessOneLocation.html',
                controller: 'processLocationCtrl'
            })
		});
