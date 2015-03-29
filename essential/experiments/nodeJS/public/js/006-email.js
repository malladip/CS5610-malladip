var app = angular.module('emailApp', []);

app.controller("emailCtrl", function ($scope, MyService) {

    $scope.send = function () {

        var to = $scope.email;
        var subject = $scope.subject;
        var mail = $scope.mail;

        console.log("to " + to);
        console.log("subject " + subject);
        console.log("mail " + mail);


        if (to != null && to != undefined) {
            MyService.send(to,subject,mail);
        }

    };

});