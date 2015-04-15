var app = angular.module("WidgetsApp", ['ngRoute', 'ngDialog']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/lock', {
        templateUrl: 'partials/lock.html',
        controller: 'LockCtrl',
    }).
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    }).
    when('/widgets', {
        templateUrl: 'partials/widgets.html'
    }).
    when('/adminPage', {
        templateUrl: 'partials/adminPage.html',
        controller: 'AdminCtrl',
        resolve: {
            loggedIn: checkAdminLogin
        }
    }).
    otherwise({
        redirectTo: '/lock'
    })
}
]);

var checkAdminLogin = function ($q, $timeout, $http, $location) {

    var deferred = $q.defer();

    $http.get('/adminLoggedin').success(function (user) {

        if (user != '0') {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url("/login");
        }

    });
};