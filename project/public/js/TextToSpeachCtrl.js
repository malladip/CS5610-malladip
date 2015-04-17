
app.controller("TextToSpeachCtrl", function ($scope, $sce, MyService) {

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("textToSpeach");
            $("#textToSpeach").offset({ top: userData.top, left: userData.left });

        } else {

        };
    };

    $scope.$watch(
        function () {
            return MyService.getShowTextToSpeach();
        },
       function (showTextToSpeach) {
           $scope.showTextToSpeach = showTextToSpeach;
       }, true);

    $scope.playText = function () {
        var textVal = $scope.text;
        if (textVal != undefined) {
            var query = $sce.trustAsResourceUrl("http://tts-api.com/tts.mp3?q=" + textVal);
            $("#text-to-speach-container iframe").attr('src', query);
        }
    };

    $scope.eraseText = function () {
        $scope.text = "";
    };

    $scope.closeTextToSpeach = function () {
        $scope.text = "";
        MyService.setShowTextToSpeach();
        $("#textToSpeach").offset({ top: 100, left: 100 });
    };

});