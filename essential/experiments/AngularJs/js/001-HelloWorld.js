var app = angular.module("HelloWorld", []);

app.controller("Controller", function ($scope) {

    $scope.Name = "Welcome " + $scope.fullName;
});