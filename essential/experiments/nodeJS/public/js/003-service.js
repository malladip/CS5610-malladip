
app.factory("LoginService", function ($http) {

    var currentUser;

    var login = function (username, password) {

        console.log("username : " + username);
        console.log("pass : " + password);

        var url = "/LoginRegisterMongodb/login/" + username + "/" + password;

        return ($http.get(url)
            .success(function (response) {
                currentUser = response;
                return currentUser;
            })
            .error(function (err) {
                alert(err);
            }));
    };

    var register = function (username, password) {

        var url = "/LoginRegisterMongodb/register/" + username + "/" + password;

        return ($http.post(url)
            .success(function (response) {
                
                currentUser = response;
                return currentUser;
            })
            .error(function (err) {
                alert(err);
            }));
    };

    var logout = function () {
        currentUser = null;
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
