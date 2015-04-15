
app.controller("ForgotPasswordCtrl", function ($scope, MyService) {

    $scope.changedPreference = function () {
        $scope.emailUsername = "";
        $scope.seqUsername = "";
        $scope.seqUsername = "";
        $scope.question = undefined;
        $scope.answer = undefined;
        $scope.okToChange = "";
        $scope.newPassword = "";
        $scope.confirm = "";
        $scope.errorMsg = "";
        $scope.successMsg = "";
        $scope.passwordChanged = "";
        $scope.passwordSent = "";
    };

    $scope.sendPasswordToEmail = function () {

        var username = $scope.emailUsername;

        if (username != "" && username != undefined) {
            MyService.sendPasswordToEmail(username, function (res) {
                if (res == 'User not registered in system' || res == 'Email is not verified') {
                    $scope.errorMsg = res;
                }
                else if (res == 'Password sent to your Email!!') {
                    $scope.passwordSent = 'ok';
                    $scope.successMsg = res;
                }
            });
        } else {
            $scope.errorMsg = "Please Enter Username";
        }
    };

    $scope.getSecurityQuestion = function () {
        var username = $scope.seqUsername;

        if (username != "" && username != undefined) {
            MyService.getSecurityQuestion(username, function (res) {
                if (res == 'User not registered in system' || res == 'Email is not verified') {
                    $scope.errorMsg = res;
                }
                else {
                    $scope.question = res;
                    $scope.errorMsg = "";
                    $scope.successMsg = "";
                }
            });
        } else {
            $scope.errorMsg = "Please Enter Username";
        }
    };

    $scope.checkAnswer = function () {
        var username = $scope.seqUsername;
        var question = $scope.question;
        var answer = $scope.answer;

        if (answer != "" && answer != undefined) {

            var userDetails = { 'username': username, 'question': question, 'answer': answer };

            MyService.checkAnswer(userDetails, function (res) {
                if (res != 'ok') {
                    $scope.errorMsg = res;
                }
                else {
                    $scope.okToChange = 'ok';
                }
            });
        } else {
            $scope.errorMsg = "Please enter your answer";
        }
    }

    $scope.resetPassword = function () {
        var username = $scope.seqUsername;
        var question = $scope.question;
        var answer = $scope.answer;
        var newPassword = $scope.newPassword;
        var confirm = $scope.confirm;

        if (newPassword != "" && newPassword != undefined &&
            confirm != "" && confirm != undefined) {

            if (newPassword == confirm) {

                var userDetails = { 'username': username, 'question': question, 'answer': answer, 'newPassword': newPassword };

                MyService.resetPassword(userDetails, function (res) {
                    if (res != 'ok') {
                        $scope.errorMsg = res;
                    }
                    else {
                        $scope.passwordChanged = 'ok';
                        $scope.successMsg = "Password reset was successful";
                    }
                });
            } else {
                $scope.errorMsg = "New Password and Confirm Password do not match";
            }

        } else {
            $scope.errorMsg = "Please fill all the fields";
        }
    }
});