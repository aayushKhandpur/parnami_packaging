dashboardModule.config(function($stateProvider) {
    $stateProvider
        .state('index.dashboard', {
            url: '/dashboard',
            templateUrl: 'ng-app/dashboard/templates/WelcomePage.html',

        })
});
