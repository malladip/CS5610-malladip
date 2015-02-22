
app.factory("LoginService", function () {

    var currentUser = null;

    var users = [{ username: 'admin', password: 'admin' }];

    var register = function (username, password) {
        var new_user = { username: username, password: password };
        users.push(new_user);
        currentUser = username;
        return currentUser;
    };


    var login = function (username, password) {

        for (var i = 0; i < users.length; i++) {
            if (username == users[i].username && password == users[i].password) {
                currentUser = username;
                return currentUser;
            }
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
        register: register,
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout
    }
});
