var app = angular.module("WidgetsApp", ['ngRoute', 'ngDialog']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/lock', {
        templateUrl: 'partials/006-lock.html',
        controller: 'LockCtrl',
    }).
    when('/login', {
        templateUrl: 'partials/006-login.html',
        controller: 'LoginCtrl'
    }).
    when('/profile', {
        templateUrl: 'partials/006-Profile.html'
    }).
    otherwise({
        redirectTo: '/lock'
    })
}
]);
