app.controller("GoogleCtrl", function ($scope, MyService) {

    var isLoggedIn, userData;

    $scope.$watch(
        function () {
            return MyService.getShowGoogle();
        },
       function (showGoogle) {
           $scope.showGoogle = showGoogle;
       }, true);

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("google");
            $("#google").offset({ top: userData.top, left: userData.left });
        };
    };

    $scope.gogolesearch = function () {
        var searchString = $scope.googlesearch;
        var URL = "https://www.google.com/?gws_rd=ssl#q=SEARCHSTRING";
        if (searchString.length != 0) {
            URL = URL.replace("SEARCHSTRING", searchString);
            window.open(URL);
        } else {
            $scope.googleSearch.focus();
        }
    };

    $scope.closegoogle = function () {
        $scope.googlesearch = "";
        MyService.setShowGoogle();
    };

});