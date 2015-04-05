app.controller("profileCtrl", function ($scope, $interval, $document, MyService) {

    $scope.currentUser = MyService.getCurrentUser();

    $scope.init = function () {
        if ($scope.currentUser.verified == false)
            $scope.msg = "Please Verify Your email id";
    };

    $scope.logout = function () {
        MyService.logout();
    };

    $scope.change = function () {
        var oldPass = $scope.oldPassword;
        var newPass = $scope.newPassword;
        var confirm = $scope.confirm;

        if (oldPass != null && oldPass != undefined && newPass != null && newPass != undefined && confirm != null && confirm != undefined) {
            if (confirm != newPass) {
                alert("Confirm Password does not match New password");
            }
            else {
                MyService.changePassword(oldPass, newPass);
            }
        }

    }

});