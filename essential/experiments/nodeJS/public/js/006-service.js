
app.factory("MyService", function ($http) {

    var send = function (to, subject, mail) {

        console.log("to " + to);
        console.log("subject " + subject);
        console.log("mail " + mail);


        var mailobj = { 'to': to, 'subject': subject, 'mail': mail };

        $http.post("/email/send", mailobj)
        .success(function (res) {
            if (res == 'ok') {
                alert("Mail sent");
            } else {
                alert("Error sending mail");
            }

        });
    };

    return {
        send: send
    };
});