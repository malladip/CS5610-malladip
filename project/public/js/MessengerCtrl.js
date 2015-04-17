
app.controller("MessengerCtrl", function ($scope, MyService) {

    $scope.currentUser = MyService.getCurrentUser();
    $scope.messageWith = null;

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("message");
            $("#messenger").offset({ top: userData.top, left: userData.left });

        } else {

        };
    };

    $scope.$watch(
        function () {
            return MyService.getShowMessenger();
        },
       function (showMessenger) {
           $scope.showMessenger = showMessenger;
       }, true);

    $scope.$watch(
        function () {
            return MyService.getAllRegisteredUsers();
        },
        function (allUsers) {
            $scope.users = allUsers;
        }, true);


    $scope.$watch(
        function () {
            if ($scope.messageWith != null) {
                return MyService.getMessagesWith($scope.messageWith);
            }
        },
        function (messagesWithUser) {
            $scope.messagesWithUser = messagesWithUser;
        }, true);

    var $target = $('#messagesOf');
    $target.animate({ scrollTop: $target.height() }, 1000);

    $scope.loadMsgs = function (user) {
        $scope.messageWith = user;
        $scope.errorMsg = "";
        $scope.newMsg = "";
    };

    $scope.send = function () {
        if ($scope.newMsg != "" && $scope.newMsg != undefined) {

            MyService.sendMessage($scope.messageWith, $scope.newMsg, function (msg) {
                if (msg == 'ok') {
                    $scope.errorMsg = "";
                    $scope.newMsg = "";
                } else {
                    $scope.errorMsg = "Error Sending Message";
                }
            });

        };
    };

    $scope.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    };

    $scope.closeMessenger = function () {
        $scope.messageWith = null;
        MyService.setShowMessenger();
        $("#messenger").offset({ top: 100, left: 100 });
    };

});
