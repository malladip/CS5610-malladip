app.controller("WidgetsCtrl", function ($scope, MyService) {
    $scope.$watch(
        function () {
            return MyService.getBackground();
        },
       function (background) {
           $scope.background = background;
       }, true);
});
