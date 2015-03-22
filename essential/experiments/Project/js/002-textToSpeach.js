
myApp.controller('textToSpeach', function ($scope, $sce, Desktop) {

    $scope.textContent = "";

    $scope.$watch(
        function () {
            return Desktop.getTextToSpeach();
        },
       function (textToSpeach) {
           $scope.textToSpeach = textToSpeach;
       }, true);

    $scope.play = function () {
        var content = $scope.textContent;
        content = content.replace(new RegExp(" ", "g"), "%20");
        $scope.audio = "http://tts-api.com/tts.mp3?q=" + content;
    };

    $scope.trustSrc = function (url) {

        return $sce.trustAsResourceUrl(url);
    }

    $scope.closeTextToSpeach = function () {
        Desktop.setTextToSpeach();
    };

});
