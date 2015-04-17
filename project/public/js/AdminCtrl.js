app.controller("AdminCtrl", function ($scope, $location, AdminService) {

    $scope.msg = "";

    $scope.login = function () {
        if ($scope.adminuser == undefined || $scope.adminuser == "" ||
            $scope.adminpass == undefined || $scope.adminpass == "") {
            $scope.msg = "Please enter Username and Password";
        } else {
            $scope.msg = "";
            AdminService.login($scope.adminuser, $scope.adminpass, function (msg) {
                if (msg == "ok") {
                    $scope.isLoggedIn = true;
                    $location.url("/adminPage");
                } else {
                    $scope.msg = "Invalid details";
                }
            });
        }
    };

    $scope.logout = function () {
        $scope.msg = "";
        $scope.isLoggedIn = false;
        AdminService.logout();
    }

    $scope.init = function () {
        if ($scope.isLoggedIn) {
            $scope.users = AdminService.getData("auth");
            $scope.userprofile = AdminService.getData("prof");
            $scope.message = AdminService.getData("msg");
            $scope.widgetdata = AdminService.getData("wid");
        }
    };

    $scope.$watch(
        function () {
            return AdminService.getData("auth");
        },
       function (user) {
           $scope.users = user;
       }, true);

    $scope.$watch(
        function () {
            return AdminService.getData("prof");
        },
       function (prof) {
           $scope.userprofile = prof;
       }, true);


    $scope.$watch(
        function () {
            return AdminService.getData("msg");
        },
       function (msg) {
           $scope.message = msg;
       }, true);

    $scope.$watch(
        function () {
            return AdminService.getData("wid");
        },
       function (wid) {
           $scope.widgetdata = wid;
       }, true);

    $scope.clearDB = function () {
        var r = confirm("Do you want to clear the entire database?");
        if (r == true) {
            AdminService.clearDB();
        }
    };

    $scope.deleteAll = function (type) {
        var r = confirm("Do you want to delete all entiries in " + type + " ?");
        if (r == true) {

            AdminService.deleteAll(type);
        }
    };


    $scope.deleteByID = function (type) {
        if (type == 'user') {
            if ($scope.deleteUserId != undefined && $scope.deleteUserId != "") {
                var r = confirm("Do you want to delete user with id: " + $scope.deleteUserId + " ?");
                if (r == true) {

                    var data = { 'type': 'user', 'id': $scope.deleteUserId };
                    $scope.deleteUserId = "";
                    AdminService.deleteByID(data);
                }

            } else {
                alert("Please enter User ID");
            }
        } else if (type == 'profile') {
            if ($scope.deleteProfileId != undefined && $scope.ProfileId != "") {
                var r = confirm("Do you want to delete profile of user id: " + $scope.deleteProfileId + " ?");
                if (r == true) {

                    var data = { 'type': 'profile', 'id': $scope.deleteProfileId };
                    $scope.deleteProfileId = "";
                    AdminService.deleteByID(data);
                }
            } else {
                alert("Please enter User ID");
            }
        } else if (type == 'message') {
            if ($scope.deleteMessageId != undefined && $scope.deleteMessageId != "") {
                var r = confirm("Do you want to delete all messages of user id: " + $scope.deleteMessageId + " ?");
                if (r == true) {

                    var data = { 'type': 'message', 'id': $scope.deleteMessageId };
                    $scope.deleteMessageId = "";
                    AdminService.deleteByID(data);
                }
            } else {
                alert("Please enter User ID");
            }
        } else if (type == 'widget') {
            if ($scope.deleteWidgetId != undefined && $scope.deleteWidgetId != "") {
                var r = confirm("Do you want to delete all widget data of user id: " + $scope.deleteWidgetId + " ?");
                if (r == true) {
                    var data = { 'type': 'widget', 'id': $scope.deleteWidgetId };
                    $scope.deleteWidgetId = "";
                    AdminService.deleteByID(data);
                }
            } else {
                alert("Please enter User ID");
            }
        }
    };
});