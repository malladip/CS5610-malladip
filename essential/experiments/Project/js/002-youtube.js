
myApp.controller('youtube', function ($scope, $http, $sce, Desktop) {

    $scope.$watch(
        function () {
            return Desktop.getYoutube();
        },
       function (youtube) {

           $scope.youtube = youtube;
       }, true);


    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.getVideos = function () {
        var query = $scope.youtubeSearch;

        $scope.videos = [];

        var keyword = encodeURIComponent(query);
        var url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';

        $http.get(url)
            .success(function (response) {

                var videos = response.data.items;
                for (video in videos) {
                    $scope.videos.push(videos[video].id);
                };
            });
    };

    $scope.closeYoutube = function () {
        Desktop.setYoutube();
    };
});