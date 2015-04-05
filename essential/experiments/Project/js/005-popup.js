var myApplication = angular.module('popupApp', ['ngDialog']);

myApplication.controller('popupCtrl', function ($scope, ngDialog) {

    $scope.openPopup = function () {
        ngDialog.open({
            template: '<div><h2>This is the popup</h2></div>',
            plain: true,
            scope: $scope
        });
    };

});