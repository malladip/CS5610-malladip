
app.controller('TaskbarCtrl', function ($scope, $interval, MyService, $document, ngDialog) {

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();

        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("taskbar");
            setToolbar(userData);
        } else {
            setToolbar("bottom");
        };
    };

    var setToolbar = function (position) {
        var taskbar = $("#taskbar");
        var dateTime = $(".date-time");

        if (position == "top") {  // Top
            taskbar
                .removeClass("taskbar-left")
                .removeClass("taskbar-right")
                .removeClass("taskbar-bottom")
                .addClass("taskbar-top")
                .removeClass("scroll-y")
                .addClass("scroll-x");
            dateTime.css('margin-top', 0);
            dateTime.addClass("date-time-right")
            dateTime.addClass("pull-right");
        } else if (position == "right") { // Right
            taskbar
                .removeClass("taskbar-top")
                .removeClass("taskbar-left")
                .removeClass("taskbar-bottom")
                .addClass("taskbar-right")
                .removeClass("scroll-x")
                .addClass("scroll-y");
            dateTime
                .removeClass("date-time-right")
                .removeClass("pull-right")
                .addClass("date-time-bottom");
            dateTime.removeClass("date-time-right");
            //  dateTime.css('margin-top', dateTime.parent().height() - (dateTime.height() + 15))
        } else if (position == "bottom") { // Bottom
            taskbar
                .removeClass("taskbar-left")
                .removeClass("taskbar-right")
                .removeClass("taskbar-top")
                .addClass("taskbar-bottom")
                .removeClass("scroll-y")
                .addClass("scroll-x");
            dateTime.css('margin-top', 0);
            dateTime.addClass("date-time-right");
            dateTime.addClass("pull-right")
        } else if (position == "left") { // Left
            taskbar
                .removeClass("taskbar-top")
                .removeClass("taskbar-right")
                .removeClass("taskbar-bottom")
                .addClass("taskbar-left")
                .removeClass("scroll-x")
                .addClass("scroll-y");
            dateTime.removeClass("date-time-right");
            // dateTime.css('margin-top', dateTime.parent().height() - (dateTime.height() + 15))
        }
    }


    // Setting time for the first load
    var date = new Date();
    var minutes = date.getMinutes();

    $scope.time = (((date.getHours() + 11) % 12) + 1) + ":" + (minutes > 9 ? "" + minutes : "0" + minutes) + " " + (date.getHours() >= 12 ? 'PM' : 'AM');
    $scope.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getUTCFullYear();

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $scope.dayName = weekday[date.getDay()];

    // Making time change every 1000 milliseconds.
    $interval(function () {
        date = new Date();
        minutes = date.getMinutes();
        $scope.time = (((date.getHours() + 11) % 12) + 1) + ":" + (minutes > 9 ? "" + minutes : "0" + minutes) + " " + (date.getHours() >= 12 ? 'PM' : 'AM');
        $scope.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getUTCFullYear();

        $scope.dayName = weekday[date.getDay()];
    }, 1000);

    $scope.google = function () {
        MyService.setShowGoogle();
    };

    $scope.notepad = function () {
        MyService.setShowNotepad();
    };

    $scope.browser = function () {
        MyService.setShowBrowser();
    };

    $scope.youtube = function () {
        MyService.setShowYoutube();
    };

    $scope.textToSpeach = function () {
        MyService.setShowTextToSpeach();
    };

    $scope.calculator = function () {
        MyService.setShowCalculator();
    };

    $scope.profile = function () {
        MyService.setShowProfile();
    };

    $scope.messenger = function () {
        if (isLoggedIn == false) {

            ngDialog.open({
                template: '<center><div><h3>You are not logged in!!</h3></div><div>Please login to get access.</div></center>',
                plain: true
            });
        } else {
            MyService.setShowMessenger();
        }
    };

    $scope.weather = function () {
        MyService.setShowWeather();
    };

    $scope.stopWatch = function () {
        MyService.setShowStopWatch();
    };

    $scope.email = function () {
        if (isLoggedIn) {
            if (MyService.emailIsVerified()) {
                MyService.setShowEmail();
            } else {
                ngDialog.open({
                    template: '<center><div><h3>Email ID not verified!!</h3></div><div>Please verify your Email ID to get access!.</div></center>',
                    plain: true
                });
            }
        } else {
            ngDialog.open({
                template: '<center><div><h3>You are not logged in!!</h3></div><div>Please login to get access.</div></center>',
                plain: true
            });
        }
    };

    $scope.save = function () {
        if (isLoggedIn) {

            var googlePos = $document.find('#google').offset();
            var notepadPos = $document.find('#notepad').offset();
            var browserPos = $document.find('#browser').offset();
            var youTubePos = $document.find('#youtube').offset();
            var textToSpeachPos = $document.find('#textToSpeach').offset();
            var calculatorPos = $document.find('#calculator').offset();
            var profilePos = $document.find('#profile').offset();
            var messengerPos = $document.find('#messenger').offset();
            var weatherPos = $document.find('#weather').offset();
            var stopWatchPos = $document.find('#stop-watch').offset();
            var emailPos = $document.find('#email').offset();

            MyService.save(googlePos,
                notepadPos,
                browserPos,
                youTubePos,
                textToSpeachPos,
                calculatorPos,
                profilePos,
                messengerPos,
                weatherPos,
                stopWatchPos,
                emailPos,
                function (msg) {
                    if (msg == "error") {
                        ngDialog.open({
                            template: '<center><div><h3>Error</h3></div><div>Your data could not be saved.</div></center>',
                            plain: true
                        });
                    } else if (msg == "ok") {
                        ngDialog.open({
                            template: '<center><div><h3>Saved</h3></div><div>Your current widget positions are saved successfully.</div></center>',
                            plain: true
                        });
                    }
                });

        } else {
            ngDialog.open({
                template: '<center><div><h3>You are not logged in!!</h3></div><div>Please login to get access.</div></center>',
                plain: true
            });
        }
    };

    $scope.hideAll = function () {
        MyService.hideAll();
    };

    $scope.logout = function () {
        MyService.logout();
    };
});
