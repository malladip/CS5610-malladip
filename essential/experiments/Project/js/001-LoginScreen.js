app.controller("LoginCtrl", function ($scope, $location) {


    $scope.lockScreen = function () {
        $('body').css('background-image', 'url("../../images/backgrounds/lamborghini-desktop-440x900.jpg")');
        $('body').css('background-color', 'none');
        $location.url("/lock");
    };

});