
app.factory("MyService", function ($http, $location) {

    var currentUser;

    var login = function (username, password) {

        var user = { 'username': username, 'password': password};
        console.log(username);
        $http.post("/ChangePassword/login", user)
        .success(function (res) {

            currentUser = res;

            $location.url("/profile");

        });
    };

    var register = function (username, password,email) {

        var user = { 'username': username, 'password': password, 'email': email ,'verified':false};

        $http.post("/ChangePassword/register", user)
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
        $http.post("/ChangePassword/logout", user)
        .success(function (res) {
            currentUser = null;
            $location.url("/login");
        });
    };

    var getCurrentUser = function () {
        return currentUser;
    };

    var changePassword = function (oldPass,newPass) {
        var user = { 'username': currentUser.username, 'oldPassword': oldPass, 'newPassword': newPass };
        console.log("service " + user.username);
        $http.post("/ChangePassword/change", user)
        .success(function (res) {
            
            $location.url("/profile");
        });
    };

    return {
        login: login,
        register: register,
        logout: logout,
        getCurrentUser: getCurrentUser,
        changePassword: changePassword
    };
});