
app.controller("ProfileController", function ($scope, LoginService) {
    $scope.username = LoginService.getCurrentUser();

    $scope.changeBg = function () {
        var url = $scope.backgroundURL;
        LoginService.changeUserBG(url);
        $scope.backgroundURL = null;
    };
});