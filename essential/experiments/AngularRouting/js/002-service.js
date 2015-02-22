
app.factory("LoginService", function () {

    var currentUser = null;

    var login = function (username, password) {
        if (username == "admin" && password == "admin") {
            currentUser = username;
            return currentUser;
        }
        return null;
    };

    var logout = function () {
        currentUser = null;
    };

    var getCurrentUser = function () {
        return currentUser;
    }

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout
    }
});
