
myApp.directive('draggable', function () {
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


myApp.directive('ngEnter', function () {
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


myApp.directive('adjustIframe', function ($timeout, $window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.iframeHeight = element.prop('offsetHeight') - 76;

            angular.element($window).bind('mouseup', function () {
                scope.iframeHeight = element.prop('offsetHeight') - 76;
                scope.$apply();
            });
        }
    };
});


myApp.directive('adjustTextArea', function ($timeout, $window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.textAreaHeight = element.prop('offsetHeight') - 34;
            angular.element($window).bind('mouseup', function () {
                scope.textAreaHeight = element.prop('offsetHeight') - 34;
                scope.$apply();
            });
        }
    };
});


myApp.directive('adjustvheight', function ($timeout, $window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.height = element.prop('offsetHeight') - 72;
            angular.element($window).bind('mouseup', function () {
                scope.height = element.prop('offsetHeight') - 72;
                scope.$apply();
            });
        }
    };
});
