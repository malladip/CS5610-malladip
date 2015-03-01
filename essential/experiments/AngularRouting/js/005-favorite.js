
app.controller("FavoriteController", function ($scope, LoginService, $sce) {
    $scope.favorites = LoginService.getCurrentFavorites();

    // For displaying the youtub video
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }


    $scope.remove = function (index) {
        LoginService.removeFavorite(index);
    }

});