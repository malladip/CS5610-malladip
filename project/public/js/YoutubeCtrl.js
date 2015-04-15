
app.controller('YoutubeCtrl', function ($scope, $sce, $http, MyService) {

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("youtube");
            $("#youtube").offset({ top: userData.top, left: userData.left });

            $scope.activeTabIndex = userData.activeTab;

            $scope.favvideos = userData.favorites;
        } else {
            $scope.activeTabIndex = 0;
            $scope.youvideos = [];
            $scope.favvideos = [];
        };
    };

    $scope.$watch(
     function () {
         return MyService.getShowYoutube();
     },
    function (showYoutube) {
        $scope.showYoutube = showYoutube;
    }, true);

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.searchYoutube = function () {
        $scope.youvideos = [];
        var query = $scope.youtubeSearch;

        var keyword = encodeURIComponent(query);
        var url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';

        $http.get(url)
            .success(function (response) {

                var videos = response.data.items;
                for (video in videos) {
                    var newVideo = { 'id': videos[video].id, 'title': videos[video].title };
                    $scope.youvideos.push(newVideo);
                };
            });
    };

    $scope.openTab = function (index) {
        $scope.activeTabIndex = index;

        if (isLoggedIn == true) {
            userData.activeTab = index;
            MyService.saveYoutubeChanges(userData, function (msg) { });
        }
    };

    $scope.closeyoutube = function () {
        $scope.activeTabIndex = 0;
        $scope.youtubeSearch = "";
        $scope.favoriteSearch = "";
        $scope.youvideos = [];
        MyService.setShowYoutube();

        if (isLoggedIn == true) {
            userData.activeTab = $scope.activeTabIndex;
            MyService.saveYoutubeChanges(userData, function (msg) { });
        }
    };

    $scope.getFavoriteStarClass = function (video) {
        var videoId = video.id;
        for (index in $scope.favvideos) {
            if ($scope.favvideos[index].id == videoId) {
                return ("glyphicon glyphicon-star alreadyFavStar");
            }
        }
        return ("glyphicon glyphicon-star addToFavStar");
    }

    $scope.addFavorite = function (video) {
        var videoId = video.id;
        for (index in $scope.favvideos) {
            if ($scope.favvideos[index].id == videoId) {
                $scope.removeFavorite(video);
                return;
            }
        }
        $scope.favvideos.push(video);

        if (isLoggedIn == true) {

            userData.favorites = $scope.favvideos;

            MyService.saveYoutubeChanges(userData, function (msg) { });
        }

    }

    $scope.removeFavorite = function (video) {
        var videoId = video.id;
        for (index in $scope.favvideos) {
            if ($scope.favvideos[index].id == videoId) {
                $scope.favvideos.splice(index, 1);
            }
        }

        if (isLoggedIn == true) {

            userData.favorites = $scope.favvideos;

            MyService.saveYoutubeChanges(userData, function (msg) { });
        }

    }

});
