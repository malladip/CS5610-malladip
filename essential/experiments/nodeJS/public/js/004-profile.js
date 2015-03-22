
app.controller("ProfileController", function ($scope, LoginService) {
    $scope.user = LoginService.getCurrentUser();
});