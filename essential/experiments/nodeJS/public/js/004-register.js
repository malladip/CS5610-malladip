
app.controller("RegisterController", function ($scope, LoginService) {

    $scope.register = function () {

        LoginService.register($scope.username, $scope.password);
    };

});