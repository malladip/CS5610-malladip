var app = angular.module("navigationApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/004-home.html'
    }).
    when('/register', {
        templateUrl: 'partials/004-register.html',
        controller: 'RegisterController'
    }).
    when('/login', {
        templateUrl: 'partials/004-login.html',
        controller: 'LoginController'
    }).
    when('/profile', {
        templateUrl: 'partials/004-profile.html',
        controller: 'ProfileController'
    }).
    when('/search', {
        templateUrl: 'partials/004-search.html',
        controller: 'SearchController'
    }).
    when('/contact', {
        templateUrl: 'partials/004-contact.html'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

