
app.controller("homeCtrl", function ($scope, MyService) {

    $scope.login = function () {

        var username = $scope.existingUsername;
        var password = $scope.existingPassword;

        if (username != "" && password != "" && username != undefined && password != undefined) {
            MyService.login(username,password);
        }
    };

    $scope.register = function () {

        var username = $scope.newUsername;
        var password = $scope.newPassword;
        var email = $scope.newEmail;

        if (username != "" && username != undefined &&
            password != "" && password != undefined &&
            email != "" && email != undefined)
        {

            MyService.register(username, password,email);
        }
    };

    $scope.logout = function () {
        MyService.logout();
    };
    
});