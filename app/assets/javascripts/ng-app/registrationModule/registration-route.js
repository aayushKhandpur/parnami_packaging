registrationModule.config(function($stateProvider) {
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: 'ng-app/registrationModule/views/registration.html',
            controller: 'RegistrationCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'ng-app/registrationModule/views/newuser.html',
            controller: 'NewUserCtrl'
        })
});
