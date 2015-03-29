var myApp = angular.module('notepad', []);

myApp.controller('notepadCtrl', function ($scope) {

    $scope.notes = [{title:"Hello",note:"Note1"},{title:"jhvb",note:"Note2"}];

    $scope.currentNote = null;

    $scope.view = 'note-grid';

    $scope.openNotepad = function (index) {
        console.log(index);
        $scope.currentNote = index;
    };  

    $scope.goBack = function () {
        $scope.currentNote = null;
    };

    $scope.addNote = function () {
        $scope.currentNote = $scope.notes.length;
    };

    $scope.deleteNote = function () {
        $scope.notes.splice($scope.currentNote,1);
        $scope.currentNote = null;
    };

    $scope.listView = function () {
        $scope.view = 'note-list';
    };

    $scope.gridView = function () {
        $scope.view = 'note-grid';
    };
});
