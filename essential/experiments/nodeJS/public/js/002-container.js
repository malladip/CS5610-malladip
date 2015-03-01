var app = angular.module("HelloNodeJS", []);

app.controller("ContainerController", function ($scope,$http) {
    $scope.getResponce = function () {

        $http.get('/experiment2/getresponce')
        .success(function (responce) {
            $scope.responce = responce;
        });
    }
});