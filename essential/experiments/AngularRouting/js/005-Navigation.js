var app = angular.module("navigationApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/005-home.html'
    }).
    when('/register', {
        templateUrl: 'partials/005-register.html',
        controller: 'RegisterController'
    }).
    when('/login', {
        templateUrl: 'partials/005-login.html',
        controller: 'LoginController'
    }).
    when('/profile', {
        templateUrl: 'partials/005-profile.html',
        controller: 'ProfileController'
    }).
    when('/search', {
        templateUrl: 'partials/005-search.html',
        controller: 'SearchController'
    }).
    when('/favorite', {
        templateUrl: 'partials/005-favorite.html',
        controller: 'FavoriteController'
    }).
    when('/contact', {
        templateUrl: 'partials/005-contact.html'
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

