var app = angular.module("EmailVerification", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/009-home.html',
        controller: 'homeCtrl',
    }).
    when('/profile', {
        templateUrl: 'partials/009-profile.html',
        controller: 'profileCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);
