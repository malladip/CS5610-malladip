
app.controller('BrowserCtrl', function ($scope, $sce, $element, MyService) {

    var isLoggedIn, userData;

    $scope.tabWidth = 100;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("browser");
            $("#browser").offset({ top: userData.top, left: userData.left });
            $scope.activeTabIndex = userData.activeTab;
            $scope.browserTabs = userData.tabs;
            $scope.url = $scope.browserTabs[$scope.activeTabIndex].url;
            $scope.loadURL = $sce.trustAsResourceUrl($scope.url);
        } else {
            $scope.browserTabs = [{ url: "" }];
            $scope.activeTabIndex = 0;
        };
    };

    $scope.geTabWidth = function () {
        $scope.tabWidth = 100 / ($scope.browserTabs.length + 2);
        return ($scope.tabWidth);
    };

    $scope.$watch(
     function () {
         return MyService.getShowBrowser();
     },
    function (showBrowser) {
        $scope.showBrowser = showBrowser;
    }, true);

    $scope.url_enter = function () {

        $scope.browserTabs[$scope.activeTabIndex].url = $scope.url;

        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);

        if (isLoggedIn == true) {

            userData.tabs[$scope.activeTabIndex].url = $scope.url;

            MyService.saveBrowserChanges(userData, function (msg) { });
        }

    };

    $scope.openTab = function (index) {
        $scope.activeTabIndex = index;
        $scope.url = $scope.browserTabs[index].url;
        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);

        if (isLoggedIn == true) {

            userData.activeTab = index;

            MyService.saveBrowserChanges(userData, function (msg) { });
        }

    };

    $scope.addNewTab = function () {
        var newTab = { url: "" };
        $scope.browserTabs.push(newTab);
        $scope.tabWidth = 100 / ($scope.browserTabs.length + 2);

        $scope.activeTabIndex = $scope.browserTabs.length - 1;

        $scope.url = newTab.url;
        $scope.loadURL = $sce.trustAsResourceUrl($scope.url);


        if (isLoggedIn == true) {

            userData.tabs = $scope.browserTabs;

            userData.activeTab = $scope.activeTabIndex;

            MyService.saveBrowserChanges(userData, function (msg) { });
        }

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


        if (isLoggedIn == true) {

            userData.activeTab = $scope.activeTabIndex;

            userData.tabs = $scope.browserTabs;
            MyService.saveBrowserChanges(userData, function (msg) { });
        }
    };

    $scope.closebrowser = function () {
        $scope.browserTabs = [{ url: "" }];
        $scope.tabWidth = 100;
        $scope.activeTabIndex = 0;
        MyService.setShowBrowser();

        $("#browser").offset({ top: 100, left: 100 });
        if (isLoggedIn == true) {

            userData.activeTab = $scope.activeTabIndex;
            userData.tabs = $scope.browserTabs;
            MyService.saveBrowserChanges(userData, function (msg) { });
        }
    };

});
