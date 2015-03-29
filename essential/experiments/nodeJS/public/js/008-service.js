
app.factory("MyService", function ($http, $location) {

    var currentUser;

    var login = function (username,password) {

        var user = { 'username': username, 'password': password };

        $http.post("/EmailApp/login", user)
        .success(function (res) {

            currentUser = res;
            console.log();
            $location.url("/profile");

        });
    };

    var register = function (username, password,email) {

        var user = { 'username': username, 'password': password, 'email':email};

        $http.post("/EmailApp/register", user)
        .success(function (res) {
            if (res == null) {
                alert("Username aready exists");
            } else {
                login(res.username, res.password)
            }
        });
    };

    var logout = function () {

        var user = { 'username': currentUser.username, 'password': currentUser.password };
        console.log("service "+user.username);
        $http.post("/EmailApp/logout", user)
        .success(function (res) {
            currentUser = null;
            $location.url("/login");
        });
    };

    var send = function (to, subject, mail,pass) {

        console.log("to " + to);
        console.log("subject " + subject);
        console.log("mail " + mail);


        var mailobj = { 'from': currentUser.email, 'pass':pass ,'to': to, 'subject': subject, 'mail': mail };

        $http.post("/EmailApp/send", mailobj)
        .success(function (res) {
            if (res == 'ok') {
                alert("Mail sent");
            } else {
                alert("Error sending mail");
            }

        });
    };

    var getCurrentUser = function () {
        return currentUser;
    };
    return {
        login:login,
        register: register,
        logout: logout,
        getCurrentUser: getCurrentUser,
        send: send
    };
});