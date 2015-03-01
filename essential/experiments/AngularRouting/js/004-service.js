
app.factory("LoginService", function () {

    var currentUser = null;
    var currentBackground = null;

    var users = [{
        username: 'admin',
        password: 'admin',
        background: 'http://juliewight.com/wp-content/uploads/2013/11/desktop-hd-wallpapers-1080p.jpg'
    }];

    var register = function (username, password) {
        var new_user = { username: username, password: password };
        users.push(new_user);
        currentUser = username;
        return currentUser;
    };

    var login = function (username, password) {

        for (user in users) {
            if (users[user].username == username && users[user].password == password) {
                currentUser = username;
                currentBackground = users[user].background;
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
    };

    var getcurrentBackground = function () {
        return currentBackground;
    };

    var changeUserBG = function (url) {
        for (user in users) {
            if (users[user].username == currentUser) {
                users[user].background = url;
                currentBackground = users[user].background;
            }
        }
    };


    return {
        register: register,
        login: login,
        getCurrentUser: getCurrentUser,
        getcurrentBackground: getcurrentBackground,
        changeUserBG: changeUserBG,
        logout: logout
    }
});
