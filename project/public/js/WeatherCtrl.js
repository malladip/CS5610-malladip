
app.controller("WeatherCtrl", function ($scope, MyService, $interval) {

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("weather");
            $("#weather").offset({ top: userData.top, left: userData.left });

        } else {

        };
    };

    $scope.$watch(
        function () {
            return MyService.getShowWeather();
        },
       function (showWeather) {
           $scope.showWeather = showWeather;
       }, true);

    $scope.weather = MyService.getWeather();

    $scope.closeWeather = function () {
        MyService.setShowWeather();
    };

});
