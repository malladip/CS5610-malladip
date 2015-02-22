
app.controller("LoginController", function ($scope) {

    $scope.login = function () {
        if ($scope.username == "admin" && $scope.password == "admin") {
            alert("Login Success");
        } else {
            alert("Incorrect details");
        }
    }
});