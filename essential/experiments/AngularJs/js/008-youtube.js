var app = angular.module("WeatherData", []);

app.controller("WeatherController", function ($scope, $http,$sce) {

    $scope.vidoes = [];

    // For displaying the youtub video
    $scope.trustSrc = function (id) {
        var url = "https://www.youtube.com/embed/" + id;

        return $sce.trustAsResourceUrl(url);
    }


    $scope.getVideos = function () {

        $scope.vidoes = [];

        var search = $scope.search;

        var url = 'http://gdata.youtube.com/feeds/api/videos?q=' + search + '&format=5&max-results=6&v=2&alt=jsonc';

        $http.get(url)
            .success(function (response) {
                
                var videos = response.data.items;

                for (video in videos) {
                    $scope.vidoes.push(videos[video].id);
                    console.log(videos[video].id);
                };

            });
    };

});