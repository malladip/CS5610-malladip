
app.factory("AdminService", function ($http, $location, $interval) {

    var isLogedIn = false;

    var authentication = null;
    var userProfile = null;
    var message = null;
    var widgetData = null;

    var login = function (username, password, callback) {

        var user = { 'username': username, 'password': password };

        $http.post("/adminlogin", user)
            .success(function (res) {
                isLogedIn = "ok";
                start();
                callback('ok');
            })
       .error(function (err) {
           callback('error');
       });
    };

    var logout = function () {
        stop();
        $http.get("/adminlogout")
            .success(function (res) {
                if (res == "ok") {
                    $location.url("/login");
                }
            });
    };


    var getData = function (type) {
        if (type == "auth") {
            return authentication;
        } else if (type == "prof") {
            return userProfile;
        } else if (type == "msg") {
            return message;
        } else if (type == "wid") {
            return widgetData;
        }
    }

    var dataInterval;

    var start = function () {
        // stops any running interval to avoid two intervals running at the same time
        stop();

        // store the interval promise
        dataInterval = $interval(function () {
            $http.get("/adminGetData")
            .success(function (res) {
                authentication = res.auth;
                userProfile = res.prof;
                message = res.msg;
                widgetData = res.widget;
            });
        }, 1000);

    };

    var stop = function () {
        $interval.cancel(dataInterval);
    };


    var deleteAll = function (type) {
        if (isLogedIn) {
            var data = { 'type': type };
            $http.post("/adminDeleteAllData", data).success(function (res) { });
        }
    };

    var deleteByID = function (data) {
        if (isLogedIn) {
            $http.post("/adminDeleteData", data).success(function (res) { });
        }
    };

    var clearDB = function () {
        if (isLogedIn) {
            $http.delete("/adminClearDb").success(function (res) { });
        }
    };

    return {

        // Login
        login: login,
        logout: logout,
        getData: getData,
        deleteAll: deleteAll,
        deleteByID: deleteByID,
        clearDB: clearDB
    }
});