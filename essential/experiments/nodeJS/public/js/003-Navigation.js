var app = angular.module("navigationApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/003-home.html'
    }).
    when('/register', {
        templateUrl: 'partials/003-register.html',
        controller: 'RegisterController'
    }).
    when('/login', {
        templateUrl: 'partials/003-login.html',
        controller: 'LoginController'
    }).
    when('/profile', {
        templateUrl: 'partials/003-profile.html',
        controller: 'ProfileController'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

