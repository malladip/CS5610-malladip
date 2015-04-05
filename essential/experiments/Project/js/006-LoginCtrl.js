
app.controller("LoginCtrl", function ($scope, $location) {

    $scope.login = function () {
        
    };

    $scope.lock = function () {
        $location.url("/lock");
    }

});
