app.controller("ContainerController", function ($scope, LoginService, $location) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;
       }, true);

    $scope.isActive = function (route) {

        return route === $location.path();
    }

    $scope.logout = function () {
        LoginService.logout();
    }
});