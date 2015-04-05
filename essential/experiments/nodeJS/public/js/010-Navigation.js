var app = angular.module("EmailVerification", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/010-home.html',
        controller: 'homeCtrl',
    }).
    when('/profile', {
        templateUrl: 'partials/010-profile.html',
        controller: 'profileCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);
