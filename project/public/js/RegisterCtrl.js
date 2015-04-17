
app.controller("RegisterCtrl", function ($scope, $location, MyService) {

    $scope.registred = "";

    $scope.registering = false;

    $scope.register = function () {

        var firstname = $scope.firstname;
        var lastname = $scope.lastname;
        var username = $scope.username;
        var password = $scope.password;
        var confirm = $scope.confirm;
        var email = $scope.email;
        var phone = $scope.phone;
        var securityquestion = $scope.securityquestion;
        var securityanswer = $scope.securityanswer;

        var errorFirstname = "",
            errorLastname = "",
            errorUsername = "",
            errorPassword = "",
            errorConfirm = "",
            errorEmail = "",
            errorPhone = "",
            errorSecurityquestion = "",
            errorSecurityanswer = "",
            errorRandom;

        if (firstname == "" || firstname == undefined) {
            errorFirstname = "First name is required" + " " + errorFirstname;
        }

        if (lastname == "" || lastname == undefined) {
            errorLastname = "Last name is required" + " " + errorLastname;
        }

        if (username == "" || username == undefined) {
            errorUsername = "Username is required" + " " + errorUsername;
        }

        if (password == "" || password == undefined) {
            errorPassword = "Password is required" + " " + errorPassword;
        }

        if (confirm == "" || confirm == undefined) {
            errorConfirm = "Confirm password is required" + " " + errorConfirm;
        }

        if (password != confirm) {
            errorConfirm = "Password and Confirm does not match" + " " + errorConfirm;
        }

        if (email == "" || email == undefined) {
            errorEmail = "Enter valid email address" + " " + errorEmail;
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
            errorUsername == "" && errorPassword == "" &&
            errorConfirm == "" && errorEmail == "" &&
            errorPhone == "" && errorSecurityquestion == "" &&
            errorSecurityanswer == "") {
            var newUSer = {
                'firstname': firstname, 'lastname': lastname,
                'username': username, 'password': password,
                'email': email, 'phone': phone,
                'securityquestion': securityquestion, 'securityanswer': securityanswer
            };

            $scope.registering = true;

            MyService.register(newUSer, function (msg) {
                
                //Error
                if (typeof msg == 'string' || msg instanceof String) {

                    $("#registerButton").effect("shake");

                    errorRandom = msg;

                    $scope.errorRandom = errorRandom;

                    $scope.registering = false;

                } else { // Success

                    $scope.errorFirstname = "";
                    $scope.errorLastname = "";
                    $scope.errorUsername = "";
                    $scope.errorPassword = "";
                    $scope.errorConfirm = "";
                    $scope.errorEmail = "";
                    $scope.errorPhone = "";
                    $scope.errorSecurityquestion = "";
                    $scope.errorSecurityanswer = "";
                    $scope.errorRandom = "";

                    $scope.registred = "ok";
                    $location.url("/widgets");
                }
            });
        }
        else {
            $scope.errorFirstname = errorFirstname;
            $scope.errorLastname = errorLastname;
            $scope.errorUsername = errorUsername;
            $scope.errorPassword = errorPassword;
            $scope.errorConfirm = errorConfirm;
            $scope.errorEmail = errorEmail;
            $scope.errorPhone = errorPhone;
            $scope.errorSecurityquestion = errorSecurityquestion;
            $scope.errorSecurityanswer = errorSecurityanswer;
        }
    };

});