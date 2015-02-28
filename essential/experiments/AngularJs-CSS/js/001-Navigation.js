var app = angular.module("navigationApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/001-home.html'
    }).
    when('/register', {
        templateUrl: 'partials/001-register.html',
        controller: 'RegisterController'
    }).
    when('/login', {
        templateUrl: 'partials/001-login.html',
        controller: 'LoginController'
    }).
    when('/profile', {
        templateUrl: 'partials/001-profile.html',
        controller: 'ProfileController'
    }).
    when('/contact', {
        templateUrl: 'partials/001-contact.html'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

