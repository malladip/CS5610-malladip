
app.factory("LoginService", function ($http) {

    var currentUser;

    var login = function (username, password) {

        var url = "/login/user/" + username + "/" + password;

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

        var url = "/register/user/" + username + "/" + password;

        return ($http.post(url)
            .success(function (response) {
                currentUser = response;
                return currentUser;
            })
            .error(function (err) {
                alert(err);
            }));
    };

    var addNote = function (newNote) {
        var url = "/newNote/" + currentUser.username + "/" + newNote;
        return ($http.post(url)
            .success(function (response) {
                currentUser = response;
                return currentUser;
            })
            .error(function (err) {
                alert(err);
            }));
    };

    var deleteNote = function (index) {
        var url = "/deleteNote/" + currentUser.username + "/" + index;
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
        addNote: addNote,
        deleteNote:deleteNote,
        logout: logout,
        register: register
    }
});
