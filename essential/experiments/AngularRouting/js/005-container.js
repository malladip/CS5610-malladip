app.controller("ContainerController", function ($scope, LoginService, $location) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;

           var background;
           if(currentUser == null){
               background = "http://www.hdwallpapersos.com/wp-content/uploads/2014/07/On-Stranger-Tides19201080.jpg";
           }else{
               background = LoginService.getcurrentBackground();
           }
           $scope.background = { 'background-image': 'url(' + background + ')' };

       }, true);

    $scope.isActive = function (route) {
        
        return route === $location.path();
    }

    $scope.logout = function () {
        LoginService.logout();
    }
});