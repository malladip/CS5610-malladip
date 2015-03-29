
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

        if (username != "" && password != "" && username != undefined && password != undefined) {
            MyService.register(username, password);
        }
    };

    $scope.logout = function () {
        MyService.logout();
    };
    
});