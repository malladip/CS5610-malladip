
app.controller("SearchController", function ($scope,LoginService, $sce) {
    $scope.username = LoginService.getCurrentUser();
    $scope.videos = LoginService.getCurrentSearch();

    // For displaying the youtub video
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.search = function () {

        $scope.videos = [];
        var query = $scope.query;

        var videos = LoginService.search(query);
        $scope.videos = videos;
    };

    $scope.addFavorite = function (video_id) {

        var success = LoginService.addFavorite(video_id);
        if (success) {
            alert("Added to favorites");
        }
    }

});