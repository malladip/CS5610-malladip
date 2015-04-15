
app.controller("ProfileCtrl", function ($scope, MyService, ngDialog) {

    var isLoggedIn, userData;

    $scope.activeTabIndex = 0;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("setting");
            $("#profile").offset({ top: userData.top, left: userData.left });

            $scope.user = MyService.getCurrentUser();

        } else {

        };
    };

    $scope.$watch(
        function () {
            return MyService.getShowProfile();
        },
       function (showProfile) {
           $scope.showProfile = MyService.getShowProfile();
       }, true);

    $scope.openTab = function (index) {
        if (isLoggedIn == false && (index == 1 || index == 2)) {
            ngDialog.open({
                template: '<center><div><h3>You are not logged in!!</h3></div><div>Please login to get access.</div></center>',
                plain: true
            });
        }
        else {

            $scope.activeTabIndex = index;

            $scope.errorFirstname = "";
            $scope.errorLastname = "";
            $scope.errorPhone = "";
            $scope.errorSecurityquestion = "";
            $scope.errorSecurityanswer = "";
            $scope.userInfoErrorMsg = "";
            $scope.userInfoSuccMsg = "";

            $scope.changePasswordSuccMsg = "";
            $scope.changePasswordErrorMsg = "";

        }
    };

    $scope.closeProfile = function () {
        $scope.activeTabIndex = 0;

        $scope.errorFirstname = "";
        $scope.errorLastname = "";
        $scope.errorPhone = "";
        $scope.errorSecurityquestion = "";
        $scope.errorSecurityanswer = "";
        $scope.userInfoErrorMsg = "";
        $scope.userInfoSuccMsg = "";

        $scope.changePasswordSuccMsg = "";
        $scope.changePasswordErrorMsg = "";

        MyService.setShowProfile();
    };

    $scope.changeBg = function () {

        var url = $scope.bgUrl;

        $scope.bgUrl = "";

        MyService.setBackground(url);

    };

    $scope.updateInfo = function () {

        var firstname = $scope.user.firstname;
        var lastname = $scope.user.lastname;
        var phone = $scope.user.phone;
        var securityquestion = $scope.user.secq;
        var securityanswer = $scope.user.seca;

        var errorFirstname = "",
            errorLastname = "",
            errorPhone = "",
            errorSecurityquestion = "",
            errorSecurityanswer = "";

        if (firstname == "" || firstname == undefined) {
            errorFirstname = "First name is required" + " " + errorFirstname;
        }

        if (lastname == "" || lastname == undefined) {
            errorLastname = "Last name is required" + " " + errorLastname;
        }

        if (phone == "" || phone == undefined) {
            errorPhone = "Phone number should be a 10 digit number" + " " + errorPhone;
        }

        if (securityquestion == "" || securityquestion == undefined) {
            errorSecurityquestion = "Security question is required" + " " + errorSecurityquestion;
        }

        if (securityanswer == "" || securityanswer == undefined) {
            errorSecurityanswer = "Security answer is required" + " " + errorSecurityanswer;
        }

        if (errorFirstname == "" && errorLastname == "" &&
            errorPhone == "" && errorSecurityquestion == "" &&
            errorSecurityanswer == "") {

            MyService.updateUserInfo($scope.user, function (resp) {
                if (resp == "ok") {
                    $scope.errorFirstname = "";
                    $scope.errorLastname = "";
                    $scope.errorPhone = "";
                    $scope.errorSecurityquestion = "";
                    $scope.errorSecurityanswer = "";
                    $scope.userInfoErrorMsg = "";
                    $scope.userInfoSuccMsg = "Update Successful";
                } else {
                    $scope.errorFirstname = "";
                    $scope.errorLastname = "";
                    $scope.errorPhone = "";
                    $scope.errorSecurityquestion = "";
                    $scope.errorSecurityanswer = "";
                    $scope.userInfoSuccMsg = "";
                    $scope.userInfoErrorMsg = "Error in updating";
                }
            });
        }
        else {
            $scope.errorFirstname = errorFirstname;
            $scope.errorLastname = errorLastname;
            $scope.errorPhone = errorPhone;
            $scope.errorSecurityquestion = errorSecurityquestion;
            $scope.errorSecurityanswer = errorSecurityanswer;

        }
    };

    $scope.changePassword = function () {

        var oldPassword = $scope.oldPassword;
        var newPassword = $scope.newPassword;
        var confirm = $scope.confirm;
        $scope.changePasswordErrorMsg = "";
        $scope.changePasswordSuccMsg = "";


        if (oldPassword != "" && oldPassword != undefined &&
            newPassword != "" && newPassword != undefined &&
            confirm != "" && confirm != undefined) {

            if (newPassword == confirm) {

                var userDetails = { 'userId': $scope.user.userId, 'password': oldPassword, 'newPassword': newPassword };

                MyService.changePassword(userDetails, function (res) {
                    if (res != 'ok') {
                        if (res == 'Mail error') {
                            $scope.oldPassword = "";
                            $scope.newPassword = "";
                            $scope.confirm = "";
                            $scope.changePasswordSuccMsg = "Password reset was successful";
                            $scope.changePasswordErrorMsg = res;
                        } else {
                            $scope.changePasswordErrorMsg = res;
                        }
                    }
                    else {
                        $scope.oldPassword = "";
                        $scope.newPassword = "";
                        $scope.confirm = "";
                        $scope.changePasswordSuccMsg = "Password reset was successful";
                    }
                });
            } else {
                $scope.changePasswordErrorMsg = "New Password and Confirm Password do not match";
            }

        } else {
            $scope.changePasswordErrorMsg = "Please fill all the fields";
        }

    };
});