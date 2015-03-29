app.controller("profileCtrl", function ($scope, $interval, MyService) {

    $scope.currentUser = MyService.getCurrentUser();

    $interval(function () {
        $scope.otherUsers = MyService.getCurrentlyLoggedIn();
    }, 1000);

    $scope.logout = function () {
        MyService.logout();
    };

});