var app = angular.module("LoggedInUsers", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/007-home.html',
        controller: 'homeCtrl',
    }).
    when('/profile', {
        templateUrl: 'partials/007-profile.html',
        controller: 'profileCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);
