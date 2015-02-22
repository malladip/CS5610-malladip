app.controller("ContainerController", function ($scope, LoginService) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;
       }, true);


    $scope.logout = function () {
        LoginService.logout();
    }
});