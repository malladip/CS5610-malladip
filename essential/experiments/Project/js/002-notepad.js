myApp.controller('notepad', function ($scope, Desktop) {

    $scope.$watch(
        function () {
            return Desktop.getNotepad();
        },
       function (notepad) {
           $scope.notepad = notepad;
       }, true);

    $scope.content = "";

    $scope.closeNotepad = function () {
        Desktop.setNotepad();
    };

});