
myApp.controller('google', function ($scope, Desktop) {

    $scope.$watch(
        function () {
            return Desktop.getGoogle();
        },
       function (google) {
           $scope.google = google;
       }, true);

    $scope.search = function () {
        var searchString = $scope.googleSearch;
        var URL = "https://www.google.com/?gws_rd=ssl#q=SEARCHSTRING";
        if (searchString.length != 0) {
            URL = URL.replace("SEARCHSTRING", searchString);
            window.open(URL);
        } else {
            $scope.googleSearch.focus();
        }
    };

    $scope.closeGoogle = function () {
        Desktop.setGoogle();
    };
});
