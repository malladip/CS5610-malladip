app.controller("profileCtrl", function ($scope, $interval, $document,MyService) {

    $scope.currentUser = MyService.getCurrentUser();

    $scope.init = function () {
        if ($scope.currentUser.verified == false)
            $scope.msg = "Please Verify Your email id";
    };

    $scope.logout = function () {
        MyService.logout();
    };

});