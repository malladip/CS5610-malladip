﻿
app.controller("LoginController", function ($scope, LoginService) {

    $scope.login = function () {

        var user = LoginService.login($scope.username, $scope.password);
        if (user) {
            window.location = "#/favorite";
        } else {
            alert("Incorrect details");
        }
    }
});