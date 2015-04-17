app.controller("EmailCtrl", function ($scope, MyService) {

    $scope.currentUser = MyService.getCurrentUser();

    $scope.askPassword = false;

    var isLoggedIn, userData;

    $scope.init = function () {
        isLoggedIn = MyService.isLoggedIn();
        if (isLoggedIn == true) {
            userData = MyService.getDataOnInitialLoad("email");
            $("#email").offset({ top: userData.top, left: userData.left });
        }
    };

    $scope.$watch(
        function () {
            return MyService.getShowEmail();
        },
       function (showEmail) {
           $scope.showEmail = showEmail;
       }, true);

    $scope.closeEmail = function () {
        MyService.setShowEmail();
        $("#email").offset({ top: 100, left: 100 });
    };

    $scope.send = function () {
        var to = $scope.toEmail;
        var subject = $scope.subject;
        var mail = $scope.mail;
        if ($scope.currentUser != "" && $scope.currentUser != undefined) {

            if (to == undefined || to == "") {
                $scope.errorMessage = "Please enter valid Email ID";
            } else if (mail == undefined || mail == "") {
                $scope.errorMessage = "Please enter the mail body";
            }
            else {
                if ($scope.currentUser.email != "" && $scope.currentUser.email != undefined) {

                    if ($scope.emailPassword == "" || $scope.emailPassword == undefined) {
                        $scope.askPassword = true;
                    }
                    else {
                        var email = { 'from': $scope.currentUser.email, 'to': to, 'subject': subject, 'mail': mail, 'password': $scope.emailPassword };
                        $scope.askPassword = false;
                        $scope.emailPassword = "";
                        MyService.sendEmail(email, function (msg) {
                            if (msg == "error") {
                                $scope.errorMessage = "Error in sending Mail";
                            }
                            else if (msg == "ok") {
                                $scope.errorMessage = "";
                                $scope.successMessage = "Mail Sent Succssfully!!";
                            }
                        });
                    }
                }
                else {
                    $scope.errorMessage = "Please login to access";
                }
            }
        }
        else {
            $scope.errorMessage = "Please login to access";
        }
    };

    $scope.draft = function () {

        $scope.askPassword = false;

        if ($scope.toEmail == undefined || $scope.toEmail == "") {
            $scope.errorMessage = "Please enter valid Email ID";
        } else {
            userData.to = $scope.toEmail;
            userData.subject = $scope.subject;
            userData.mail = $scope.mail;

            MyService.saveEmailChanges(userData, function (msg) {
                if (msg == "ok") {
                    $scope.errorMessage = "";
                    $scope.successMessage = "Saved as draft";
                } else if (msg == "error") {
                    $scope.successMsg = "";
                    $scope.errorMessage = "Error Saving";
                }
            });
        }
    };

    $scope.loadDraft = function () {
        $scope.toEmail = "";
        $scope.subject = "";
        $scope.mail = "";
        $scope.askPassword = false;

        $scope.toEmail = userData.to;
        $scope.subject = userData.subject;
        $scope.mail = userData.mail;
    };

    $scope.clear = function () {
        $scope.toEmail = "";
        $scope.subject = "";
        $scope.mail = "";
        $scope.successMessage = "";
        $scope.errorMessage = "";
        $scope.askPassword = false;
    };
});