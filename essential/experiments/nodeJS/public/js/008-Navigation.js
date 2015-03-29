var app = angular.module("EmailApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/008-home.html',
        controller: 'homeCtrl',
    }).
    when('/profile', {
        templateUrl: 'partials/008-profile.html',
        controller: 'profileCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);
