
app.factory("MyService", function ($http, $location) {

    var currentUser;

    var currentlyLoggedIn = [];

    var login = function (username,password) {

        var user = { 'username': username, 'password': password };

        $http.post("/LoggedInUsers/login", user)
        .success(function (res) {

            currentUser = res;

            $location.url("/profile");

        });
    };

    var register = function (username, password) {

        var user = { 'username': username, 'password': password};

        $http.post("/LoggedInUsers/register", user)
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
        $http.post("/LoggedInUsers/logout", user)
        .success(function (res) {
            currentUser = null;
            $location.url("/login");
        });
    };

    var getCurrentUser = function () {
        return currentUser;
    };

    var getLoggedinUsers = function () {

        $http.get("/LoggedInUsers/loggedinUsers")
        .success(function (res) {
            currentlyLoggedIn = res;
            
        });
    };
    
    var getCurrentlyLoggedIn = function(){
        getLoggedinUsers();
        return currentlyLoggedIn;
    };

    return {
        login:login,
        register: register,
        logout: logout,
        getCurrentUser: getCurrentUser,
        getCurrentlyLoggedIn: getCurrentlyLoggedIn
    };
});