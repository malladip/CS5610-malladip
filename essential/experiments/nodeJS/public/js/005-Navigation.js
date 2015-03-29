var app = angular.module("LoggedInUsers", ['ngRoute']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/005-home.html',
        controller: 'homeCtrl',
    }).
    when('/profile', {
        templateUrl: 'partials/005-profile.html',
        controller: 'profileCtrl',
      /*  resolve: {
            loggedin: checkLoggedin
        }*/
    }).
    otherwise({
        redirectTo: '/home'
    })
}
]);

/*
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
*/