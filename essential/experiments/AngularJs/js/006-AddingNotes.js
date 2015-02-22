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


    $scope.save = function (text) {
        if (!$scope.notes) {
            $scope.notes = [];
        }
        $scope.notes.push(text);
        console.log($scope.notes);
    }

    $scope.remove = function (index) {
        $scope.notes.splice(index, 1);
        
        if ($scope.notes.length == 0) {
            $scope.notes = undefined;
        }
    }

    $scope.copy = function (note) {
        $scope.text = note;
    }
});