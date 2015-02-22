var app = angular.module("navigationApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/001-home.html'
    }).
    when('/login', {
        templateUrl: 'partials/001-login.html',
        controller: 'LoginController'
    }).
    when('/contact', {
        templateUrl: 'partials/001-contact.html'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);
