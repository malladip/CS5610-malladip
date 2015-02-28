
app.controller("RegisterController", function ($scope, LoginService) {

    $scope.register = function () {

        var user = LoginService.register($scope.username, $scope.password);

        if (user) {
            window.location = "#/profile";
        } else {
            alert("Error in registration");
        }
    }

});