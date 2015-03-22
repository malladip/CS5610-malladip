
var myApp = angular.module('myApp', []);

myApp.controller('taskbar', function ($scope, $window, $interval, Desktop) {

    // Setting time for the first load
    var date = new Date();
    var minutes = date.getMinutes();

    $scope.time = (((date.getHours() + 11) % 12) + 1) + ":" + (minutes > 9 ? "" + minutes : "0" + minutes) + " " + (date.getHours() >= 12 ? 'PM' : 'AM');
    $scope.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getUTCFullYear();

    // Making time change every 1000 milliseconds.
    $interval(function () {
        date = new Date();
        minutes = date.getMinutes();
        $scope.time = (((date.getHours() + 11) % 12) + 1) + ":" + (minutes > 9 ? "" + minutes : "0" + minutes) + " " + (date.getHours() >= 12 ? 'PM' : 'AM');
        $scope.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getUTCFullYear();
    }, 1000);


    $scope.changeBGActive = false;

    $scope.browser = function () {
        Desktop.setBrowser();
    };

    $scope.notepad = function () {
        Desktop.setNotepad();
    };

    $scope.youtube = function () {
        Desktop.setYoutube();
    };

    $scope.textToSpeach = function () {
        Desktop.setTextToSpeach();
    };

    $scope.google = function () {
        Desktop.setGoogle();
    };

    $scope.changeBG = function () {
        if ($scope.changeBGActive == true) {
            $scope.changeBGActive = false;
        } else if ($scope.changeBGActive == false) {
            $scope.changeBGActive = true;
        }
    };

    $scope.goChangeBG = function () {
        var url = $scope.url;
        $scope.background = { 'background-image': 'url(' + url + ')' };
        $scope.url = "";
        $scope.changeBGActive = false;
    };

    $scope.close = function () {
        $window.close();
    };
});

