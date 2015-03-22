var app = angular.module("MyApp", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider
        .when('/lock', {
            templateUrl: 'partials/001-LockScreen.html',
            controller: 'LockCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/001-LoginScreen.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/lock'
        })
}
]);

