
app.controller("LoginCtrl", function ($scope, $location, ngDialog, MyService, $rootScope) {

    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;

        $scope.msg = "";

        if (username != "" && username != undefined &&
            password != "" && password != undefined) {

            var user = { 'username': username, 'password': password };

            MyService.login(user, function (msg) {

                if (msg == 'ok') {
                    ngDialog.open({
                        template: '<center><div><h2>Welcome ' + username + '</h2></div> <div><span class="success">You successfully logged into system!!</span></div></center',
                        plain: true
                    });
                    $location.url("/widgets");
                } else if (msg == 'error') {
                    $("#loginDetails").effect("shake");
                    $scope.msg = "Invalid Details";
                }

            });

        } else {
            $("#loginDetails").effect("shake");
            $scope.msg = "Enter username and password";
        }

    };

    $scope.freeUser = function () {
        ngDialog.open({
            template: '<center><div><h2>WELCOME </h2></div> <div>You now have a limited access to the system.</div><div>To access full version, please register.</div></center>',
            plain: true
        });
        $location.url("/widgets");
    };

    $scope.forgotPassword = function () {
        ngDialog.open({
            template: 'partials/forgotPassword.html',
            controller: 'ForgotPasswordCtrl',
            scope: $rootScope.$new()
        });
    };

    $scope.register = function () {
        ngDialog.open({
            template: 'partials/register.html',
            controller: 'RegisterCtrl',
            scope: $rootScope.$new()
        });
    };

    $scope.lock = function () {
        $location.url("/lock");
    }

    $scope.adminLogin = function () {
        ngDialog.open({
            template: 'partials/adminLogin.html',
            controller: 'AdminCtrl',
            scope: $rootScope.$new()
        });
    }

});
