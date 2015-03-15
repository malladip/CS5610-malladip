var myApp = angular.module('myApp', []);

myApp.controller('browser', function ($scope, $sce, $element) {

    $scope.browserTabs = [{ url: "" }];
    $scope.tabWidth = 100;
    $scope.activeTabIndex = 0;

    $scope.url_enter = function () {

        $scope.browserTabs[$scope.activeTabIndex].url = $scope.url;

        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);

    };

    $scope.openTab = function (index) {
        $scope.activeTabIndex = index;
        $scope.url = $scope.browserTabs[index].url;
        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);

    };

    $scope.addNewTab = function () {
        var newTab = { url: "" };
        $scope.browserTabs.push(newTab);
        $scope.tabWidth = 100 / ($scope.browserTabs.length + 2);

        $scope.activeTabIndex = $scope.browserTabs.length - 1;

        $scope.url = newTab.url;
        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);

    };

    $scope.closeTab = function (index) {
        if (index == 0) {
            $scope.activeTabIndex = index;
        } else {
            $scope.activeTabIndex = index - 1;
        }

        $scope.url = $scope.browserTabs[$scope.activeTabIndex].url;
        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);
        $scope.browserTabs.splice(index, 1);
        $scope.tabWidth = 100 / ($scope.browserTabs.length + 2);

    };

    $scope.closeBrowser = function () {
        $('#browser').remove();
        $scope.browserTabs = [{ url: "" }];
        $scope.tabWidth = 100;
    };
});


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


myApp.directive('getDimensions', function ($timeout, $window) {
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
