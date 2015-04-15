
app.factory("MyService", function ($http, $location, $interval) {

    var currentUser;
    var otherUsers = [];
    var messages = [];

    var usersInterval, messagesInterval;

    var background = "";
    var taskbar = "bottom";
    var googleWidget, notepadWidget, browserWidget,
        youtubeWidget, textToSpeachWidget, calculatorWidget,
        settingWidget, messageWidget, weatherWidget,
        stopWatchWidget, emailWidget;

    var showGoogle = false;
    var showNotepad = false;
    var showBrowser = false;
    var showYoutube = false;
    var showTextToSpeach = false;
    var showCalculator = false;
    var showProfile = false;
    var showMessenger = false;
    var showWeather = false;
    var showStopWatch = false;
    var showEmail = false;

    var getCurrentUser = function () {
        return currentUser;
    };

    /********************************************* ~~ User Login Logout Register ~~ *******************************/
    var login = function (user, callback) {
        $http.post("/login", user)
       .success(function (res) {

           currentUser = res.user;
           var widgets = res.widgets;

           background = { 'background-image': 'url(' + widgets.background + ')' };
           googleWidget = widgets.google;
           notepadWidget = widgets.notepad;
           browserWidget = widgets.browser;
           youtubeWidget = widgets.youtube;
           textToSpeachWidget = widgets.textToSpeach;
           calculatorWidget = widgets.calculator;
           settingWidget = widgets.setting;
           messageWidget = widgets.message;
           weatherWidget = widgets.weather;
           stopWatchWidget = widgets.stopWatch;
           emailWidget = widgets.email;

           showGoogle = googleWidget.show;
           showNotepad = notepadWidget.show;
           showBrowser = browserWidget.show;
           showYoutube = youtubeWidget.show;
           showTextToSpeach = textToSpeachWidget.show;
           showCalculator = calculatorWidget.show;
           showProfile = settingWidget.show;
           showMessenger = messageWidget.show;
           showWeather = weatherWidget.show;
           showStopWatch = stopWatchWidget.show;
           showEmail = emailWidget.show;

           onload();
           callback('ok');
       })
        .error(function (err) {
            callback('error');
        });
    };

    var register = function (newUser, callback) {
        $http.post("/register", newUser)
        .success(function (res) {
            if (res == 'User already exists') {
                callback("Username aready exists");
            } else if (res == 'error') {
                callback("Some Error occured in Server");
            }
            else if (res == 'ok') {
                $http.post("/login", newUser)
                    .success(function (res) {

                        currentUser = res.user;
                        var widgets = res.widgets;

                        background = { 'background-image': 'url(' + widgets.background + ')' };
                        googleWidget = widgets.google;
                        notepadWidget = widgets.notepad;
                        browserWidget = widgets.browser;
                        youtubeWidget = widgets.youtube;
                        textToSpeachWidget = widgets.textToSpeach;
                        calculatorWidget = widgets.calculator;
                        settingWidget = widgets.setting;
                        messageWidget = widgets.message;
                        weatherWidget = widgets.weather;
                        stopWatchWidget = widgets.stopWatch;
                        emailWidget = widgets.email;


                        showGoogle = googleWidget.show;
                        showNotepad = notepadWidget.show;
                        showBrowser = browserWidget.show;
                        showYoutube = youtubeWidget.show;
                        showTextToSpeach = textToSpeachWidget.show;
                        showCalculator = calculatorWidget.show;
                        showProfile = settingWidget.show;
                        showMessenger = messageWidget.show;
                        showWeather = weatherWidget.show;
                        showStopWatch = stopWatchWidget.show;
                        showEmail = emailWidget.show;

                        onload();

                        callback(res);
                    });
            }
        });
    };



    var logout = function () {
        if (currentUser) {
            $http.post("/logout", currentUser)
 .success(function (res) {
     stop();
     currentUser = null;
     otherUsers = [];
     messages = [];

     background = "";
     taskbar = "bottom";
     showGoogle = false;
     showNotepad = false;
     showBrowser = false;
     showYoutube = false;
     showTextToSpeach = false;
     showCalculator = false;
     showProfile = false;
     showMessenger = false;
     showWeather = false;
     showStopWatch = false;
     showEmail = false;

     $location.url("/login");
 });

        }
        else {
            currentUser = null;
            otherUsers = [];
            messages = [];

            background = "";
            taskbar = "bottom";
            showGoogle = false;
            showNotepad = false;
            showBrowser = false;
            showYoutube = false;
            showTextToSpeach = false;
            showCalculator = false;
            showProfile = false;
            showMessenger = false;
            showWeather = false;
            showStopWatch = false;
            showEmail = false;

            $location.url("/login");
        }
    };


    var isLoggedIn = function () {
        if (currentUser) return true;
        else return false;
    };

    var emailIsVerified = function () {
        if (currentUser) {
            return currentUser.verified;
        } else {
            return false;
        }
    };
    /***************************************************** ~~ Get Data On Initial Load ~~ ****************************/

    var getBackground = function () {
        return background;
    };

    var getDataOnInitialLoad = function (widget) {

        if (widget == "taskbar") {
            return taskbar;
        } else if (widget == "google") {
            return googleWidget;
        } else if (widget == "notepad") {
            return notepadWidget;
        } else if (widget == "browser") {
            return browserWidget;
        } else if (widget == "youtube") {
            return youtubeWidget;
        } else if (widget == "textToSpeach") {
            return textToSpeachWidget;
        } else if (widget == "calculator") {
            return calculatorWidget;
        } else if (widget == "setting") {
            return settingWidget;
        } else if (widget == "message") {
            return messageWidget;
        } else if (widget == "weather") {
            return weatherWidget;
        } else if (widget == "stopWatch") {
            return stopWatchWidget;
        } else if (widget == "email") {
            return emailWidget;
        }
    };


    /***************************************************** ~~ Forgot Password ~~ *****************************************/

    var sendPasswordToEmail = function (username, callback) {

        var usernameObj = { 'username': username };

        $http.post("/sendPasswordToEmail", usernameObj)
        .success(function (res) {
            callback(res);
        });
    };

    var getSecurityQuestion = function (username, callback) {

        var usernameObj = { 'username': username };

        $http.post("/getSecurityQuestion", usernameObj)
        .success(function (res) {
            callback(res);
        });
    };

    var checkAnswer = function (userDetails, callback) {

        $http.post("/checkAnswer", userDetails)
        .success(function (res) {
            callback(res);
        });
    };

    var resetPassword = function (userDetails, callback) {

        $http.post("/resetPassword", userDetails)
        .success(function (res) {
            callback(res);
        });
    };

    /*********************************************************************************************************************/

    var getShowGoogle = function () {
        return showGoogle;
    };

    var setShowGoogle = function () {
        showGoogle = showGoogle === false ? true : false;
    };

    var getShowNotepad = function () {
        return showNotepad;
    };

    var setShowNotepad = function () {
        showNotepad = showNotepad === false ? true : false;
    };

    var getShowBrowser = function () {
        return showBrowser;
    };

    var setShowBrowser = function () {
        showBrowser = showBrowser === false ? true : false;
    };

    var getShowYoutube = function () {
        return showYoutube;
    };

    var setShowYoutube = function () {
        showYoutube = showYoutube === false ? true : false;
    };

    var getShowTextToSpeach = function () {
        return showTextToSpeach;
    };

    var setShowTextToSpeach = function () {
        showTextToSpeach = showTextToSpeach === false ? true : false;
    };

    var getShowCalculator = function () {
        return showCalculator;
    };

    var setShowCalculator = function () {
        showCalculator = showCalculator === false ? true : false;
    };

    var getShowProfile = function () {
        return showProfile;
    };

    var setShowProfile = function () {
        showProfile = showProfile === false ? true : false;
    };

    var getShowMessenger = function () {
        return showMessenger;
    };

    var setShowMessenger = function () {
        showMessenger = showMessenger === false ? true : false;
    };

    var getShowWeather = function () {
        return showWeather;
    };

    var setShowWeather = function () {
        showWeather = showWeather === false ? true : false;
    };

    var getShowStopWatch = function () {
        return showStopWatch;
    };

    var setShowStopWatch = function () {
        showStopWatch = showStopWatch === false ? true : false;
    };

    var getShowEmail = function () {
        return showEmail;
    };

    var setShowEmail = function () {
        showEmail = showEmail === false ? true : false;
    };

    /***************************************** ~~ User Background Profile Password ~~ ***********************************************/

    //Background
    var getBackground = function () {
        return background;
    };

    var setBackground = function (newBackground) {

        if (currentUser) {
            var user = { 'userId': currentUser.userId, 'widgetName': 'background', 'widget': newBackground };

            $http.post("/saveWidgetChanges", user)
            .success(function (res) {
                if (res == 'error') {
                } else {
                    background = { 'background-image': 'url(' + res + ')' };
                }
            });
        } else {
            background = { 'background-image': 'url(' + newBackground + ')' };
        }
    };

    //User info update
    var updateUserInfo = function (user, callback) {
        if (currentUser) {

            $http.post("/updateUserInfo", user)
           .success(function (res) {
               if (res == 'Error') {
                   callback("Error");
               }
               else {
                   currentUser = res;
                   callback("ok");
               }
           });

        }
    };

    // change password
    var changePassword = function (userDetails, callback) {
        if (currentUser) {

            $http.post("/changePassword", userDetails)
            .success(function (res) {
                callback(res);
            });
        }
    };

    /******************************************************** ~~ Messaging ~~ ***********************************************/
    var onload = function () {

        $http.post("/allOtherRegisteredUsers", currentUser)
            .success(function (res) {
                otherUsers = res;
            });

        start();
    }

    var start = function () {
        // stops any running interval to avoid two intervals running at the same time
        stop();

        // store the interval promise
        usersInterval = $interval(function () {
            $http.post("/allOtherRegisteredUsers", currentUser)
            .success(function (res) {
                otherUsers = res;
            });
        }, 1000);

        messagesInterval = $interval(function () {
            $http.get("/messages", currentUser)
            .success(function (res) {
                messages = res;
            });
        }, 1000);
    };

    var stop = function () {
        $interval.cancel(usersInterval);
        $interval.cancel(messagesInterval);
    };

    var getAllRegisteredUsers = function () {

        return (otherUsers);
    };

    var getMessagesWith = function (user) {

        var userId = user.userId;
        var messagesWith = [];
        for (index in messages) {

            if (messages[index].to == userId || messages[index].from == userId) {
                messagesWith.push(messages[index]);
            }

        }
        return messagesWith;
    }

    var sendMessage = function (messageWith, message, callback) {

        var messageObj = { 'from': currentUser, 'to': messageWith, 'message': message };

        $http.post("/sendMessage", messageObj)
            .success(function (res) {
                callback(res);
            });
    };

    /******************************************************** ~~ Weather ~~ ***********************************************/

    var getWeather = function () {
        var weather = { temp: {}, clouds: null };
        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=Boston,usa&units=metric&callback=JSON_CALLBACK').success(function (data) {
            if (data) {
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
                }
                weather.clouds = data.clouds ? data.clouds.all : undefined;
            }
        });

        return weather;
    };

    /******************************************************** ~~ Save button ~~ ***********************************************/

    var save = function (googlePos,
            notepadPos,
            browserPos,
            youTubePos,
            textToSpeachPos,
            calculatorPos,
            profilePos,
            messengerPos,
            weatherPos,
            stopWatchPos,
            emailPos,
            callback) {
        if (currentUser) {

            if (googlePos.top == 0 && googlePos.left == 0) {
                googleWidget.top = 100;
                googleWidget.left = 100;
            } else {
                googleWidget.top = googlePos.top;
                googleWidget.left = googlePos.left;
            }
            googleWidget.show = showGoogle;


            if (notepadPos.top == 0 && notepadPos.left == 0) {
                notepadWidget.top = 100;
                notepadWidget.left = 100;
            } else {
                notepadWidget.top = notepadPos.top;
                notepadWidget.left = notepadPos.left;
            }
            notepadWidget.show = showNotepad;

            if (browserPos.top == 0 && browserPos.left == 0) {
                browserWidget.top = 100;
                browserWidget.left = 100;
            } else {
                browserWidget.top = browserPos.top;
                browserWidget.left = browserPos.left;
            }
            browserWidget.show = showBrowser;

            if (youTubePos.top == 0 && youTubePos.left == 0) {
                youtubeWidget.top = 100;
                youtubeWidget.left = 100;
            } else {
                youtubeWidget.top = youTubePos.top;
                youtubeWidget.left = youTubePos.left;
            }
            youtubeWidget.show = showYoutube;

            if (textToSpeachPos.top == 0 && textToSpeachPos.left == 0) {
                textToSpeachWidget.top = 100;
                textToSpeachWidget.left = 100;
            } else {
                textToSpeachWidget.top = textToSpeachPos.top;
                textToSpeachWidget.left = textToSpeachPos.left;
            }
            textToSpeachWidget.show = showTextToSpeach;

            if (calculatorPos.top == 0 && calculatorPos.left == 0) {
                calculatorWidget.top = 100;
                calculatorWidget.left = 100;
            } else {
                calculatorWidget.top = calculatorPos.top;
                calculatorWidget.left = calculatorPos.left;
            }
            calculatorWidget.show = showCalculator;

            if (profilePos.top == 0 && profilePos.left == 0) {
                settingWidget.top = 100;
                settingWidget.left = 100;
            } else {
                settingWidget.top = profilePos.top;
                settingWidget.left = profilePos.left;
            }
            settingWidget.show = showProfile;

            if (messengerPos.top == 0 && messengerPos.left == 0) {
                messageWidget.top = 100;
                messageWidget.left = 100;
            } else {
                messageWidget.top = messengerPos.top;
                messageWidget.left = messengerPos.left;
            }
            messageWidget.show = showMessenger;

            if (weatherPos.top == 0 && weatherPos.left == 0) {
                weatherWidget.top = 100;
                weatherWidget.left = 100;
            } else {
                weatherWidget.top = weatherPos.top;
                weatherWidget.left = weatherPos.left;
            }
            weatherWidget.show = showWeather;

            if (stopWatchPos.top == 0 && stopWatchPos.left == 0) {
                stopWatchWidget.top = 100;
                stopWatchWidget.left = 100;
            } else {
                stopWatchWidget.top = stopWatchPos.top;
                stopWatchWidget.left = stopWatchPos.left;
            }
            stopWatchWidget.show = showStopWatch;

            if (emailPos.top == 0 && emailPos.left == 0) {
                emailWidget.top = 100;
                emailWidget.left = 100;
            } else {
                emailWidget.top = emailPos.top;
                emailWidget.left = emailPos.left;
            }
            emailWidget.show = showEmail;

            var userData = {
                'userId': currentUser.userId,
                'widgetName': 'all',
                'taskbar': taskbar,
                'google': googleWidget,
                'notepad': notepadWidget,
                'browser': browserWidget,
                'youtube': youtubeWidget,
                'textToSpeach': textToSpeachWidget,
                'calculator': calculatorWidget,
                'setting': settingWidget,
                'message': messageWidget,
                'weather': weatherWidget,
                'stopWatch': stopWatchWidget,
                'email': emailWidget
            };

            $http.post("/saveWidgetChanges", userData)
            .success(function (res) {
                callback(res);
            });
        }
    };

    /******************************************************** ~~ Taskbar ~~ ***********************************************/

    var setTaskbar = function (pos) {
        taskbar = pos;
    };

    /******************************************************** ~~ Email App ~~ ***********************************************/

    var sendEmail = function (email, callback) {
        $http.post("/sendEmail", email)
            .success(function (res) {
                callback(res);
            });
    };

    /******************************************************** ~~ NotePad ~~ ***********************************************/

    var saveNotepadChanges = function (notes, callback) {

        var user = { 'userId': currentUser.userId, 'widgetName': 'notepad', 'widget': notes };

        $http.post("/saveWidgetChanges", user)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                notepadWidget = res;
                callback("ok");
            }
        });
    };


    /******************************************************** ~~ Youtube ~~ ***********************************************/

    var saveYoutubeChanges = function (youtube, callback) {

        var user = { 'userId': currentUser.userId, 'widgetName': 'youtube', 'widget': youtube };

        $http.post("/saveWidgetChanges", user)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                youtubeWidget = res;
                callback("ok");
            }
        });
    };

    /******************************************************** ~~ Email ~~ ***********************************************/

    var saveEmailChanges = function (email, callback) {

        var user = { 'userId': currentUser.userId, 'widgetName': 'email', 'widget': email };

        $http.post("/saveWidgetChanges", user)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                emailWidget = res;
                callback("ok");
            }
        });
    };

    /******************************************************** ~~ Browser ~~ ***********************************************/

    var saveBrowserChanges = function (browser, callback) {

        var user = { 'userId': currentUser.userId, 'widgetName': 'browser', 'widget': browser };

        $http.post("/saveWidgetChanges", user)
        .success(function (res) {
            if (res == 'error') {
                callback(res);
            } else {
                browserWidget = res;
                callback("ok");
            }
        });
    };
    /*********************************************************************************************************************/
    /******************************************************** ~~ Return ~~ ***********************************************/
    /*********************************************************************************************************************/

    return {

        // Login
        login: login,
        register: register,
        getCurrentUser: getCurrentUser,
        logout: logout,
        isLoggedIn: isLoggedIn,
        emailIsVerified: emailIsVerified,
        getBackground: getBackground,
        getDataOnInitialLoad: getDataOnInitialLoad,

        // Forgot Password
        sendPasswordToEmail: sendPasswordToEmail,
        getSecurityQuestion: getSecurityQuestion,
        checkAnswer: checkAnswer,
        resetPassword: resetPassword,

        // Widgets
        getShowGoogle: getShowGoogle,
        setShowGoogle: setShowGoogle,
        getShowNotepad: getShowNotepad,
        setShowNotepad: setShowNotepad,
        getShowBrowser: getShowBrowser,
        setShowBrowser: setShowBrowser,
        getShowYoutube: getShowYoutube,
        setShowYoutube: setShowYoutube,
        getShowTextToSpeach: getShowTextToSpeach,
        setShowTextToSpeach: setShowTextToSpeach,
        getShowCalculator: getShowCalculator,
        setShowCalculator: setShowCalculator,
        getShowProfile: getShowProfile,
        setShowProfile: setShowProfile,
        getShowMessenger: getShowMessenger,
        setShowMessenger: setShowMessenger,
        getShowWeather: getShowWeather,
        setShowWeather: setShowWeather,
        getShowStopWatch: getShowStopWatch,
        setShowStopWatch: setShowStopWatch,
        getShowEmail: getShowEmail,
        setShowEmail: setShowEmail,

        //Background
        getBackground: getBackground,
        setBackground: setBackground,
        //User info edit
        updateUserInfo: updateUserInfo,
        //Change password
        changePassword: changePassword,

        getAllRegisteredUsers: getAllRegisteredUsers,
        sendMessage: sendMessage,
        getMessagesWith: getMessagesWith,

        //Weather
        getWeather: getWeather,

        //Email
        sendEmail: sendEmail,

        //Notepad
        saveNotepadChanges: saveNotepadChanges,
        saveYoutubeChanges: saveYoutubeChanges,
        saveEmailChanges: saveEmailChanges,
        saveBrowserChanges: saveBrowserChanges,

        //Taskbar
        setTaskbar: setTaskbar,

        //Save
        save: save
    }

});