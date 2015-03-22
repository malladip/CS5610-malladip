$(function () {
    $('#sortable').sortable({
        handle: 'button',
        cancel: ''
    })

});

var myApp = angular.module("toolbar", []);

myApp.controller('toolbarCtrl', function ($scope) {

});


myApp.directive("changeToolbar", function ($window) {
    return {
        restrict: "A",
        link: function (scope, element) {

            var initialX = 0, initialY = 0;
            var dragging = false;
            var window_width = $window.innerWidth;
            var window_height = $window.innerHeight;

            var toolbar = element.find("#toolbar");

            element.bind('mousedown', function (event) {

                initialX = event.clientX;
                initialY = event.clientY;

                if (initialY < 55 && toolbar.hasClass("toolbar-top")) {  // Top
                    dragging = true;
                } else if (initialX >= (window_width - 80) && toolbar.hasClass("toolbar-right")) { // Right
                    dragging = true;
                } else if (initialY >= (window_height - 55) && toolbar.hasClass("toolbar-bottom")) { // Bottom
                    dragging = true;
                } else if (initialX < 80 && toolbar.hasClass("toolbar-left")) { // Left
                    dragging = true;
                }


            });

            element.bind('mousemove', function (event) {
                if (dragging == true) {

                    var currentX = 0;
                    var currentY = 0;

                    currentX = event.clientX;
                    currentY = event.clientY;


                    if (currentY < 55) {  // Top
                        toolbar
                            .removeClass("toolbar-left")
                            .removeClass("toolbar-right")
                            .removeClass("toolbar-bottom")
                            .addClass("toolbar-top");
                    } else if (currentX >= window_width - 80) { // Right
                        toolbar
                            .removeClass("toolbar-top")
                            .removeClass("toolbar-left")
                            .removeClass("toolbar-bottom")
                            .addClass("toolbar-right");
                    } else if (currentY >= window_height - 55) { // Bottom
                        toolbar
                            .removeClass("toolbar-left")
                            .removeClass("toolbar-right")
                            .removeClass("toolbar-top")
                            .addClass("toolbar-bottom");
                    } else if (currentX < 80) { // Left
                        toolbar
                            .removeClass("toolbar-top")
                            .removeClass("toolbar-right")
                            .removeClass("toolbar-bottom")
                            .addClass("toolbar-left");
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