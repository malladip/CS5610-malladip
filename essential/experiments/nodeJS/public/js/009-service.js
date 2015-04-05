
app.factory("MyService", function ($http, $location) {

    var currentUser;

    var login = function (username, password) {

        var user = { 'username': username, 'password': password};
        console.log(username);
        $http.post("/EmailVerification/login", user)
        .success(function (res) {

            currentUser = res;

            $location.url("/profile");

        });
    };

    var register = function (username, password,email) {

        var user = { 'username': username, 'password': password, 'email': email ,'verified':false};

        $http.post("/EmailVerification/register", user)
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
        console.log("service " + user.username);
        $http.post("/EmailVerification/logout", user)
        .success(function (res) {
            currentUser = null;
            $location.url("/login");
        });
    };

    var getCurrentUser = function () {
        return currentUser;
    };


    return {
        login: login,
        register: register,
        logout: logout,
        getCurrentUser: getCurrentUser
    };
});