
app.controller('NotepadCtrl', function ($scope, MyService) {

    var isLoggedIn;

    var isLoggedIn, userData;

    $scope.currentNote = null;

    $scope.errorMsg = "";
    $scope.successMsg = "";

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("notepad");
            $("#notepad").offset({ top: userData.top, left: userData.left });

            $scope.view = userData.view;

            $scope.notes = userData.notes;

        } else {

            $scope.notes = [{ title: "Hello", note: "First Note" }];

            $scope.view = 'note-grid';

        };
    };

    $scope.$watch(
    function () {
        return MyService.getShowNotepad();
    },
   function (showNotepad) {
       $scope.showNotepad = showNotepad;
   }, true);


    $scope.closenotepad = function () {
        $scope.currentNote = null;
        $scope.errorMsg = "";
        $scope.successMsg = "";
        MyService.setShowNotepad();
    };

    $scope.openNotepad = function (index) {
        $scope.currentNote = { 'id': index, 'title': $scope.notes[index].title, 'note': $scope.notes[index].note };
    };

    $scope.goBack = function () {
        $scope.currentNote = null;
        $scope.errorMsg = "";
        $scope.successMsg = "";
    };

    $scope.goSave = function () {
        var editedNote = $scope.currentNote;


        $('.success').show();
        $('.error').show();

        if (editedNote.id == 'new') {
            var newNote = { 'title': editedNote.title, 'note': editedNote.note };
            $scope.notes.push(newNote);
            $scope.currentNote = { 'id': ($scope.notes.length - 1), 'title': newNote.title, 'note': newNote.note };
        } else {
            $scope.notes[editedNote.id].title = editedNote.title;
            $scope.notes[editedNote.id].note = editedNote.note;
        }

        $scope.successMsg = "Saved";
        $scope.errorMsg = "";


        if (isLoggedIn == true) {

            userData.notes = $scope.notes;

            MyService.saveNotepadChanges(userData, function (msg) {
                if (msg == "ok") {
                    $scope.errorMsg = "";
                    $scope.successMsg = "Saved";
                } else if (msg == "error") {
                    $scope.successMsg = "";
                    $scope.errorMsg = "Error Saving";
                }
            });
        }

        setTimeout(function () {
            $('.success').fadeOut('fast');
            $('.success').hide();
            $('.error').fadeOut('fast');
            $('.error').hide();
        }, 3000);

    };

    $scope.addNote = function () {
        var newNote = { 'id': 'new', title: "New", 'note': "" };
        $scope.currentNote = newNote;
    };

    $scope.deleteNote = function () {
        var editedNote = $scope.currentNote;

        if (editedNote.id != 'new') {
            $scope.notes.splice(editedNote.id, 1);
        }
        $scope.currentNote = null;

        if (isLoggedIn == true) {

            userData.notes = $scope.notes;

            MyService.saveNotepadChanges(userData, function (msg) { });
        }
    };

    $scope.listView = function () {
        $scope.view = 'note-list';

        if (isLoggedIn == true) {

            userData.view = $scope.view;

            MyService.saveNotepadChanges(userData, function (msg) { });
        }
    };

    $scope.gridView = function () {

        $scope.view = 'note-grid';

        if (isLoggedIn == true) {

            userData.view = $scope.view;

            MyService.saveNotepadChanges(userData, function (msg) { });
        }
    };

});