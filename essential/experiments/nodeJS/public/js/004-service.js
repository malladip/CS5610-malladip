
app.factory("LoginService", function ($http, $location) {

    var currentUser;

    var login = function (username, password) {
var user = {'username':username,'password':password};
        $http.post("/PassportAuthentication/login", user)
        .success(function (res) {
            currentUser = res;

            $location.url("/profile");
        });
    };

    var register = function (username, password) {

        var user = { 'username': username, 'password': password, 'notes': [] };
        $http.post("/PassportAuthentication/register", user)
        .success(function (res) {
            login(res.username,res.password)
        });
    };

    var logout = function () {
        currentUser = null;
        $http.post("/PassportAuthentication/logout", currentUser)
        .success(function (res) {
            $location.url("/login");
        });
    };

    var getCurrentUser = function () {
        return currentUser;
    };

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout,
        register: register
    }
});
