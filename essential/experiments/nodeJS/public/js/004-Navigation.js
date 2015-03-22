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
        controller: 'ProfileController',
        resolve: {
            loggedin: checkLoggedin
        }
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);


var checkLoggedin = function ($q,$timeout,$http,$location) {

    var deferred = $q.defer();
    console.log("entere");

    $http.get('/PassportAuthentication/loggedin').success(function (user) {

        if (user != '0') {
            console.log(user);

            deferred.resolve();
        } else {
            console.log("entere");

            deferred.reject();
            $location.url("/login");
        }

    });

};
