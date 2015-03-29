app.controller("profileCtrl", function ($scope, $interval, MyService) {

    $scope.currentUser = MyService.getCurrentUser();

    $scope.send = function () {

        var from = $scope.currentUser.email;
        var to = $scope.email;

        if (from != null && from != undefined && to != null && to != undefined) {

            $scope.showPop = true;

            $('#passPop').dialog();
        } else {
            alert("Please enter from and to email address");
        }
    };

    $scope.logout = function () {
        MyService.logout();
    };


    $scope.sendEmail = function () {

        $scope.showPop = false;

        $('#passPop').dialog("close");

        var pass = $scope.emailPass;
        var to = $scope.email;
        var subject = $scope.subject;
        var mail = $scope.mail;

        $scope.emailPass = "";

        if (pass != null && pass != undefined) {
            MyService.send(to, subject, mail, pass);
        }

    };
});