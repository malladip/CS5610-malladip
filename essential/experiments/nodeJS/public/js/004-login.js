
app.controller("LoginController", function (LoginService,$scope,$location) {

    $scope.login = function () {
        LoginService.login($scope.username, $scope.password);
    }
});