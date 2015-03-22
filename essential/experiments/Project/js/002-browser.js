
myApp.controller('browser', function ($scope, $sce, $element, Desktop) {

    $scope.browserTabs = [{ url: "" }];
    $scope.tabWidth = 100;
    $scope.activeTabIndex = 0;

    $scope.$watch(
        function () {
            return Desktop.getBrowser();
        },
       function (browser) {
           $scope.browser = browser;
       }, true);

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
            if ($scope.browserTabs[index + 1]) {
                $scope.activeTabIndex = index;
            } else {
                return;
            }

        } else {
            $scope.activeTabIndex = index - 1;
        }

        $scope.url = $scope.browserTabs[$scope.activeTabIndex].url;
        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);
        $scope.browserTabs.splice(index, 1);
        $scope.tabWidth = 100 / ($scope.browserTabs.length + 2);

    };

    $scope.closeBrowser = function () {
        $scope.browserTabs = [{ url: "" }];
        $scope.tabWidth = 100;
        Desktop.setBrowser();
    };
});