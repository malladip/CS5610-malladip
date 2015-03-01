
app.controller("SearchController", function ($scope, $http, LoginService, $sce) {
    $scope.username = LoginService.getCurrentUser();
    
    // For displaying the youtub video
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.search = function () {

        $scope.videos = [];

        var query = $scope.query;
        var keyword = encodeURIComponent(query);
        var url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';

        $http.get(url)
            .success(function (response) {

                var videos = response.data.items;
                for (video in videos) {
                    var link = 'http://www.youtube.com/embed/' + videos[video].id;
                    $scope.videos.push(link);
                };
                
            });
    };
});