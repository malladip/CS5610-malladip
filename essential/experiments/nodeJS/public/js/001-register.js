
app.controller("RegisterController", function ($scope, LoginService) {

    $scope.register = function () {

        LoginService.register($scope.username, $scope.password).then(function (user) {
            if (user) {
                window.location = "#/profile";
            }
        });
    };

});