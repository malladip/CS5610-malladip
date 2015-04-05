
app.factory("MyService", function ($http, $location) {

    var currentUser;

    var login = function (username, password) {

        var user = { 'username': username, 'password': password };
        console.log(username);
        $http.post("/PositionOfWidget/login", user)
        .success(function (res) {

            currentUser = res;

            $location.url("/profile");

        });
    };

    var register = function (username, password) {

        var user = { 'username': username, 'password': password };

        $http.post("/PositionOfWidget/register", user)
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
        $http.post("/PositionOfWidget/logout", user)
        .success(function (res) {
            currentUser = null;
            $location.url("/login");
        });
    };

    var getCurrentUser = function () {
        return currentUser;
    };

    var save = function (elements) {

        var elementsObj = [];

        for (e in elements) {
            elementsObj.push({ 'id': currentUser.user._id, 'elemId': elements[e].id, 'position': elements[e].pos });
        }

        console.log("elements " + elementsObj);

        $http.post("/PositionOfWidget/save", elementsObj)
        .success(function (res) {
            
        });
    };

    return {
        login: login,
        register: register,
        logout: logout,
        getCurrentUser: getCurrentUser,
        save: save
    };
});