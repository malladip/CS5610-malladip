var app = angular.module("navigationApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/002-home.html'
    }).
    when('/login', {
        templateUrl: 'partials/002-login.html',
        controller: 'LoginController'
    }).
    when('/profile', {
        templateUrl: 'partials/002-profile.html',
        controller: 'ProfileController'
    }).
    when('/contact', {
        templateUrl: 'partials/002-contact.html'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

