app.controller("StopWatchCtrl", function ($scope, MyService, $interval) {

    $scope.seconds = 0;
    $scope.minutes = 0;
    $scope.hours = 0;

    $scope.laps = [];

    $scope.mode = "stop";
    var timer;

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("stopWatch");
            $("#stop-watch").offset({ top: userData.top, left: userData.left });

        } else {

        };
    };

    var startInterval = function () {
        // stops any running interval to avoid two intervals running at the same time
        stopInterval();
        timer = $interval(function () {
            if ($scope.mode == 'start') {

                var seconds = $scope.seconds;
                var minutes = $scope.minutes;
                var hours = $scope.hours;
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours++;
                    }
                }
                $scope.seconds = seconds;
                $scope.minutes = minutes;
                $scope.hours = hours;
            }
        }, 1000);
    };

    var stopInterval = function () {
        $interval.cancel(timer);
    }

    $scope.$watch(
        function () {
            return MyService.getShowStopWatch();
        },
       function (showStopWatch) {
           $scope.showStopWatch = showStopWatch;
       }, true);

    $scope.start = function () {
        if ($scope.mode == "stop") {
            $scope.seconds = 0;
            $scope.minutes = 0;
            $scope.hours = 0;
            $scope.laps = [];
        }
        $scope.mode = "start";
        startInterval();
    };

    $scope.pause = function () {
        $scope.mode = "pause";
    };

    $scope.stop = function () {
        $scope.mode = "stop";
        stopInterval();
    };

    $scope.refresh = function () {
        $scope.seconds = 0;
        $scope.minutes = 0;
        $scope.hours = 0;
        $scope.laps = [];
    };

    $scope.lap = function () {
        var hours = ($scope.hours + "").length > 1 ? ("" + $scope.hours) : ("0" + $scope.hours);
        var minutes = ($scope.minutes + "").length > 1 ? "" + $scope.minutes : "0" + $scope.minutes;
        var seconds = ($scope.seconds + "").length > 1 ? "" + $scope.seconds : "0" + $scope.seconds;
        var newLap = hours + " : " + minutes + " : " + seconds;
        $scope.laps.unshift(newLap);
    };

    $scope.closeStopWatch = function () {
        $scope.milliseconds = 0;
        $scope.seconds = 0;
        $scope.minutes = 0;
        $scope.hours = 0;
        $scope.laps = [];
        $scope.mode = "stop";
        MyService.setShowStopWatch();
    };

});
