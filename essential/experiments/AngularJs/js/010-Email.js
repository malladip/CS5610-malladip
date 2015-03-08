var app = angular.module("Email", []);

app.controller('EmailController', function ($scope) {

    $scope.trustSrc = function (url) {

        return $sce.trustAsResourceUrl(url);
    };

    $scope.sendMail = function () {
        var imageSearch = new google.search.ImageSearch();

        imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGESIZE,
                                   google.search.ImageSearch.IMAGESIZE_MEDIUM);

        imageSearch.setSearchCompleteCallback(this, searchComplete, [imageSearch]);

        imageSearch.execute($scope.image);

    };


    var searchComplete = function (searcher) {
        console.log(searcher);
    };

    google.setOnLoadCallback(OnLoad);
});