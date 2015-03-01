
app.controller("ProfileController", function ($scope, LoginService) {
    $scope.user = LoginService.getCurrentUser();

    $scope.addNote = function () {
        LoginService.addNote($scope.newNote).then(function (user) {
            if (user) {
                $scope.newNote = "";
                $scope.user = user.data;
            }
        });
    };

    $scope.deleteNote = function (index) {
        LoginService.deleteNote(index).then(function (user) {
            if (user) {
                $scope.user = user.data;
            }
        });
    }
});