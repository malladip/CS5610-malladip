app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                cursor: "move",
                stop: function (event, ui) {
                    scope[attrs.xpos] = ui.position.left;
                    scope[attrs.ypos] = ui.position.top;
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('resizable', function () {

    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {

                var children = elem.children();

                var elemHeight = elem.prop('offsetHeight');

                var containerHeight = (elemHeight - 35);

                $("#" + children[1].id).outerHeight(containerHeight);

                scope.$apply()
            });
        }
    };
});

/********************************************Widget Page Linking Drectives************************************************/

app.directive('google', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/google.html";

    return directive;
});

app.directive('notepad', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/notepad.html";

    return directive;
});

app.directive('browser', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/browser.html";

    return directive;
});

app.directive('youtube', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/youtube.html";

    return directive;
});

app.directive('textToSpeach', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/textToSpeach.html";

    return directive;
});

app.directive('calculator', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/calculator.html";

    return directive;
});

app.directive('profile', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/profile.html";

    return directive;
});

app.directive('messenger', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/messenger.html";

    return directive;
});

app.directive('weather', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/weather.html";

    return directive;
});

app.directive('stopWatch', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/stopWatch.html";

    return directive;
});

app.directive('email', function () {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "/partials/email.html";

    return directive;
});

/**********************************************Widget Specific Directives************************************/

app.directive('resizableBrowser', function () {

    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {

                var children = elem.children();

                var elemHeight = elem.prop('offsetHeight');

                var containerHeight = (elemHeight - 45);

                $("#browser .url-content").outerHeight((containerHeight - 34));

                scope.$apply();
            });
        }
    };
});

app.directive('resizableMessenger', function () {

    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {

                var children = elem.children();

                var elemHeight = elem.prop('offsetHeight');
                var containerHeight = (elemHeight - 35);
                $("#" + children[1].id).outerHeight(containerHeight);

                $("#messenger .contact-list").outerHeight(containerHeight - 5);
                $("#messenger .messages").outerHeight(containerHeight - 5);

                $("#messenger .contacts").outerHeight(containerHeight - 65);
                $("#messenger .messagesOf").outerHeight(containerHeight - 102);

                scope.$apply();
            });
        }
    };
});

app.directive('resizableProfile', function () {

    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {

                var children = elem.children();

                var elemHeight = elem.prop('offsetHeight');

                var containerHeight = (elemHeight - 35);

                $("#profile .options").outerHeight(containerHeight);
                $("#profile .content").outerHeight(containerHeight);

                scope.$apply();
            });
        }
    };
});

app.directive("movetaskbar", function ($window, MyService) {
    return {
        restrict: "A",
        link: function (scope, element) {

            var initialX = 0, initialY = 0;
            var dragging = false;
            var window_width = $window.innerWidth;
            var window_height = $window.innerHeight;

            var taskbar = element.find("#taskbar");


            element.bind('mousedown', function (event) {

                initialX = event.clientX;
                initialY = event.clientY;

                if (initialY < 55 && taskbar.hasClass("taskbar-top")) {  // Top
                    dragging = true;
                } else if (initialX >= (window_width - 80) && taskbar.hasClass("taskbar-right")) { // Right
                    dragging = true;
                } else if (initialY >= (window_height - 55) && taskbar.hasClass("taskbar-bottom")) { // Bottom
                    dragging = true;
                } else if (initialX < 80 && taskbar.hasClass("taskbar-left")) { // Left
                    dragging = true;
                }

            });

            element.bind('mousemove', function (event) {
                if (dragging == true) {

                    var currentX = 0;
                    var currentY = 0;

                    currentX = event.clientX;
                    currentY = event.clientY;
                    var dateTime = element.find(".date-time");

                    if (currentY < 55) {  // Top
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
                        MyService.setTaskbar("top");
                    } else if (currentX >= window_width - 80) { // Right
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
                        MyService.setTaskbar("right");
                        //  dateTime.css('margin-top', dateTime.parent().height() - (dateTime.height() + 15))
                    } else if (currentY >= window_height - 55) { // Bottom
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
                        MyService.setTaskbar("bottom");
                    } else if (currentX < 80) { // Left
                        taskbar
                            .removeClass("taskbar-top")
                            .removeClass("taskbar-right")
                            .removeClass("taskbar-bottom")
                            .addClass("taskbar-left")
                            .removeClass("scroll-x")
                            .addClass("scroll-y");
                        dateTime.removeClass("date-time-right");
                        MyService.setTaskbar("left");
                        // dateTime.css('margin-top', dateTime.parent().height() - (dateTime.height() + 15))
                    }

                    initialX = currentX;
                    initialY = currentY;
                }
            });
            element.bind('mouseup', function (event) {

                dragging = false;
                initialX = 0;
                initialY = 0;
            });
        }
    };
});

// For Text to speach widget
app.directive("resizeTextarea", function () {
    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {

                var children = elem.children();

                var elemHeight = elem.prop('offsetHeight');

                var containerHeight = (elemHeight - 35);

                $("#textToSpeach textarea").outerHeight((containerHeight - 101));

                scope.$apply();
            });
        }
    };
});

app.directive('weatherIcon', function () {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function ($scope) {
            $scope.imgurl = function () {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                    return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
});

app.directive('resizableYoutube', function () {

    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
            elem.resizable();
            elem.on('resize', function (evt, ui) {

                var children = elem.children();

                var elemHeight = elem.prop('offsetHeight');

                var containerHeight = (elemHeight - 45);

                $("#youtube .videos").outerHeight((containerHeight - 34));

                scope.$apply();
            });
        }
    };
});
