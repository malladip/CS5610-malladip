var app = angular.module("OnScreenKeyBoard", []);

app.controller("Controller", function ($scope) {

    $scope.shift = false;
    $scope.text = "";

    $scope.click = function (char) {

        if (char == 'clear') {
            $scope.text = "";
        }
        else if (char == 'enter') {
            $scope.text = $scope.text + "\n";
        }
        else if (char == 'shift') {
            $scope.shift = !$scope.shift;
        }
        else {

            if ($scope.shift == false) {
                char = angular.lowercase(char);
            }
            $scope.text = $scope.text + char;
        }
    }
});