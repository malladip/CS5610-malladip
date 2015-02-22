
app.controller("ProfileController", function ($scope, LoginService) {
    $scope.username = LoginService.getCurrentUser();
});