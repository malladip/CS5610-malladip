app.controller("ContainerController", function ($scope, LoginService, $location) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;
       }, true);

    $scope.isActive = function (route) {
        
        if ($location.path() === '/register') {
            $scope.background = { 'background-image': 'url(http://www.hdwallpapersos.com/wp-content/uploads/2014/07/On-Stranger-Tides19201080.jpg)' };
        } else if ($location.path() === '/login') {
            $scope.background = { 'background-image': 'url(http://www.hdwallpapers.in/walls/colorful_kites_hd_1080p-HD.jpg)' };
        } else if ($location.path() === '/profile') {
            $scope.background = { 'background-image': 'url(' + LoginService.getcurrentBackground() + ')' };
        } else if ($location.path() === '/contact') {
            $scope.background = { 'background-image': 'url(http://i.imgur.com/7glyqHJ.jpg)' };
        } else {
            $scope.background = { 'background-color': 'lightgrey' };
        }

        return route === $location.path();
    }

    $scope.logout = function () {
        LoginService.logout();
    }
});