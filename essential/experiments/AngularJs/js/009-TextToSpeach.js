var app = angular.module("TextToSpeach", []);

app.controller('TextToSpeachController', function ($scope, $sce) {

    $scope.trustSrc = function (url) {
        
        return $sce.trustAsResourceUrl(url);
    }

    $scope.covert = function () {

        var text = $scope.text;

        text = text.replace(new RegExp(" ", "g"), "%20");

        $scope.audio = "http://tts-api.com/tts.mp3?q=" + text;
    }
});