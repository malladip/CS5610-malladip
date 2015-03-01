
app.factory("LoginService", function ($http) {

    var currentUser = null;
    var currentBackground = null;
    var currentFavorites = null;
    var currentSearch = [];

    var users = [{
        username: 'admin',
        password: 'admin',
        background: 'http://juliewight.com/wp-content/uploads/2013/11/desktop-hd-wallpapers-1080p.jpg',
        videos: ["TieiJWTG2zU"]
    }];

    var register = function (username, password) {
        var new_user = { username: username, password: password };
        users.push(new_user);
        currentUser = username;
        return currentUser;
    };

    var login = function (username, password) {
        currentSearch = [];
        for (user in users) {
            if (users[user].username == username && users[user].password == password) {
                currentUser = username;
                currentBackground = users[user].background;
                currentFavorites = users[user].videos;
                return currentUser;
            }
        }
        return null;
    };

    var logout = function () {
        currentUser = null;
        currentFavorites = null;
        currentSearch = [];
    };

    var getCurrentUser = function () {
        return currentUser;
    };


    var getCurrentFavorites = function () {
        return currentFavorites;
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


    var addFavorite = function (video_id) {
        for (user in users) {
            if (users[user].username == currentUser) {
                users[user].videos.push(video_id);
                return true;
            }
        }
    };

    var removeFavorite = function (index) {
        for (user in users) {
            if (users[user].username == currentUser) {
                users[user].videos.splice(index, 1);
            }
        }
    };


    var search = function (query) {

        currentSearch = [];

        var keyword = encodeURIComponent(query);
        var url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';

        $http.get(url)
            .success(function (response) {

                var videos = response.data.items;
                for (video in videos) {
                    currentSearch.push(videos[video].id);
                };

            });
        return currentSearch;
    };


    var getCurrentSearch = function () {
        return currentSearch;
    };

    return {
        register: register,
        login: login,
        getCurrentUser: getCurrentUser,
        getcurrentBackground: getcurrentBackground,
        getCurrentFavorites: getCurrentFavorites,
        changeUserBG: changeUserBG,
        addFavorite:addFavorite,
        removeFavorite: removeFavorite,
        search: search,
        getCurrentSearch:getCurrentSearch,
        logout: logout
    }
});
