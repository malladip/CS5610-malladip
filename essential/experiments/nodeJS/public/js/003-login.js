
app.controller("LoginController", function (LoginService,$scope) {

    $scope.login = function () {
        LoginService.login($scope.username, $scope.password).then(function (user) {
            if (user) {
                window.location = "#/profile";
            }
        });
       
    }
});