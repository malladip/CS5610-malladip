var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var nodemailer = require("nodemailer");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());   //for parsing application/json

app.use(multer()); // for parsing multipart/form-data

app.use(session({
    secret: process.env.SESSION_SECRET || 'this is the secret',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/widgets');


/****************************************************************************************************************/

app.get("/", function (req, res) {
    res.sendfile(__dirname + '/public/widgets.html');
});

/******************************************** ~~ DATABASE SCHEMAS ~~ ********************************************/

var AuthentcationSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "Authentication" });

var AuthenticationModel = mongoose.model("AuthenticationModel", AuthentcationSchema);

var UserProfileSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    secq: String,
    seca: String,
    online: Boolean,
    verified: Boolean,
    verifId: String
}, { collection: "UserProfile" });

var UserProfileModel = mongoose.model("UserProfileModel", UserProfileSchema)

var MessageSchema = new mongoose.Schema({
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    message: String
}, { collection: "Message" });

var MessageModel = mongoose.model("MessageModel", MessageSchema);

var WidgetDataSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    taskbar: String,
    background: String,
    google: { 'top': Number, 'left': Number, 'show': Boolean },
    notepad: { 'top': Number, 'left': Number, 'show': Boolean, 'view': String, 'notes': [{ 'title': String, 'note': String }] },
    browser: { 'top': Number, 'left': Number, 'show': Boolean, 'tabs': [{ 'url': String }], 'activeTab': Number },
    youtube: { 'top': Number, 'left': Number, 'show': Boolean, 'favorites': [{ 'id': String, 'title': String }], 'activeTab': Number },
    textToSpeach: { 'top': Number, 'left': Number, 'show': Boolean },
    calculator: { 'top': Number, 'left': Number, 'show': Boolean },
    setting: { 'top': Number, 'left': Number, 'show': Boolean },
    message: { 'top': Number, 'left': Number, 'show': Boolean },
    weather: { 'top': Number, 'left': Number, 'show': Boolean },
    stopWatch: { 'top': Number, 'left': Number, 'show': Boolean },
    email: { 'top': Number, 'left': Number, 'show': Boolean, 'to': String, 'subject': String, 'mail': String }
}, { collection: "WidgetData" });

var WidgetDataModel = mongoose.model("WidgetDataModel", WidgetDataSchema);

/*************************************************** ~~ EMAIL MSG ~~***********************************************/

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "prashantwidgets@gmail.com",
        pass: "prashantproject"
    }
});

/*************************************************** ~~ Login ~~***********************************************/

passport.use('Authentication', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done) {
        AuthenticationModel.findOne({ username: username, password: password }, function (err, user) {
            if (user != null) {

                UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {

                    userProfile.online = true;
                    userProfile.save(function (err, user) {
                        if (err) {
                            res.send("Error");
                        } else {
                            return done(null, user);
                        }
                    });
                });
            } else {
                return done(null, false, { message: 'Unable to login' });
            }
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('Authentication'), function (req, res) {

    var user = req.user;

    WidgetDataModel.findOne({ userId: user.userId }, function (err, userWidgets) {

        var widgets = userWidgets;
        var userData = { 'user': user, 'widgets': userWidgets };
        res.json(userData);
    });

});

/*************************************************** ~~ Logout ~~***********************************************/

app.post("/logout", function (req, res) {

    var reqUser = req.body;

    AuthenticationModel.findOne({ _id: reqUser.userId }, function (err, user) {
        if (user != null) {

            UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {

                userProfile.online = false;
                userProfile.save(function (err, user) {
                    if (err) {
                        res.send("Error");
                    } else {
                        req.session.destroy();
                        res.send(200);
                    }
                });
            });
        } else {
            res.send("Error");
        }
    });
});

/*************************************************** ~~ Register ~~***********************************************/

var mailOptions, host, link;

app.post("/register", function (req, res) {


    var newUser = req.body;

    AuthenticationModel.findOne({ username: newUser.username }, function (err, user) {

        if (err) { res.send("error"); }
        else if (user) {
            res.send("User already exists");
        } else {

            var newUserAuth = { 'username': newUser.username, 'password': newUser.password };
            var newUserAuthObject = new AuthenticationModel(newUserAuth);

            newUserAuthObject.save(function (err, userAuth) {
                if (err) { res.send("error"); }

                var rand = Math.floor((Math.random() * 100) + 54);

                var newUserProfile = {
                    'userId': userAuth._id,
                    'firstname': newUser.firstname,
                    'lastname': newUser.lastname,
                    'email': newUser.email,
                    'phone': newUser.phone,
                    'secq': newUser.securityquestion,
                    'seca': newUser.securityanswer,
                    'online': false,
                    'verified': false,
                    'verifId': rand
                };

                var userProfileObject = new UserProfileModel(newUserProfile);

                userProfileObject.save(function (err, user) {

                    if (err) { res.send("error"); }



                    /***************************Creating Widget Record For USer*******************************/

                    var taskbar = "bottom";
                    var background = '';
                    var google = { 'top': 100, 'left': 100, 'show': false };
                    var notepad = { 'top': 100, 'left': 100, 'show': false, 'view': 'note-grid', 'notes': [{ 'title': 'Hello', 'note': 'Sample Note' }] };
                    var browser = { 'top': 100, 'left': 100, 'show': false, 'tabs': [{ 'url': '' }], 'activeTab': 0 };
                    var youtube = { 'top': 100, 'left': 100, 'show': false, 'favorites': [], 'activeTab': 0 };
                    var textToSpeach = { 'top': 100, 'left': 100, 'show': false };
                    var calculator = { 'top': 100, 'left': 100, 'show': false };
                    var setting = { 'top': 100, 'left': 100, 'show': false };
                    var message = { 'top': 100, 'left': 100, 'show': false };
                    var weather = { 'top': 100, 'left': 100, 'show': false };
                    var stopWatch = { 'top': 100, 'left': 100, 'show': false };
                    var email = { 'top': 100, 'left': 100, 'show': false, 'to': '', 'subject': '', 'mail': '' };

                    var newUserWidgets = {
                        userId: userAuth._id,
                        taskbar: taskbar,
                        background: background,
                        google: google,
                        notepad: notepad,
                        browser: browser,
                        youtube: youtube,
                        textToSpeach: textToSpeach,
                        calculator: calculator,
                        setting: setting,
                        message: message,
                        weather: weather,
                        stopWatch: stopWatch,
                        email: email
                    };

                    var newUserWidgetObject = new WidgetDataModel(newUserWidgets);
                    newUserWidgetObject.save(function (err, userAuth) {
                        if (err) { res.send("error"); }

                        host = req.get('host');
                        link = "http://" + req.get('host') + "/verify?id=" + rand + "+" + newUser.username;
                        mailOptions = {
                            to: newUser.email,
                            subject: "Do Not Reply : Please confirm your Email account",
                            html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                        }

                        smtpTransport.sendMail(mailOptions, function (error, response) {
                            if (error) {

                            } else {

                                res.send("ok");
                            }
                        });
                    });
                    /****************************************************************************************/


                });

            });
        }
    });
});

/*************************************************** ~~ Verify ~~***********************************************/

app.get('/verify', function (req, res) {


    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {


        var resp = req.query.id.split(" ");



        AuthenticationModel.findOne({ username: resp[1] }, function (err, user) {


            if (user != null) {



                UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {


                    if (userProfile != null) {


                        if (resp[0] == userProfile.verifId) {


                            userProfile.verified = true;
                            userProfile.save(function (err, user) {
                                if (err) {
                                    res.send("<h1>Error</h1>");
                                } else {
                                    res.send("<h1>Email " + mailOptions.to + " has been Successfully verified</h1>");
                                }
                            });
                        }
                        else {


                            res.send("<h1>Bad Request</h1>");
                        }
                    }
                })
            };

        });
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});

/*************************************************** ~~ Is Loggged in  ~~***********************************************/

app.post("/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});


/*************************************************** ~~ Send Password To Mail ~~***********************************************/

app.post("/sendPasswordToEmail", function (req, res) {

    var usernameObj = req.body;
    var username = usernameObj.username;

    AuthenticationModel.findOne({ username: username }, function (err, user) {
        if (user != null) {


            UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {
                if (userProfile != null) {
                    if (userProfile.verified == true) {

                        mailOptions = {
                            to: userProfile.email,
                            subject: "Do Not Reply : Password Recovery",
                            html: "Hello,<br> <br> Username: " + username + "<br>Password: " + user.password
                        }
                        smtpTransport.sendMail(mailOptions, function (error, response) {
                            if (error) {
                                res.send("error");
                            } else {
                                res.send("Password sent to your Email!!");
                            }
                        });
                    }
                    else {
                        res.send("Email is not verified");
                    }
                }
            })
        } else {
            res.send("User not registered in system");
        };

    });
});

/*************************************************** ~~ Get Security Question ~~***********************************************/

app.post("/getSecurityQuestion", function (req, res) {

    var usernameObj = req.body;
    var username = usernameObj.username;



    AuthenticationModel.findOne({ username: username }, function (err, user) {


        if (user != null) {



            UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {


                if (userProfile != null) {
                    if (userProfile.verified == true) {


                        res.send(userProfile.secq);
                    }
                    else {
                        res.send("Email is not verified");
                    }
                }
            })
        } else {
            res.send("User not registered in system");
        };
    });
});

/*************************************************** ~~ Check Security Answer ~~***********************************************/

app.post("/checkAnswer", function (req, res) {

    var userdetails = req.body;

    AuthenticationModel.findOne({ username: userdetails.username }, function (err, user) {
        if (user != null) {

            UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {
                if (userProfile != null) {
                    if (userProfile.verified == true && userProfile.secq == userdetails.question && userProfile.seca == userdetails.answer) {
                        res.send("ok");
                    }
                    else {
                        res.send("Incorrect answer!!");
                    }
                }
            })
        } else {
            res.send("User not registered in system");
        };
    });
});

/*************************************************** ~~ Reset Password ~~***********************************************/

app.post("/resetPassword", function (req, res) {

    var userdetails = req.body;

    AuthenticationModel.findOne({ username: userdetails.username }, function (err, user) {
        if (user != null) {

            UserProfileModel.findOne({ userId: user._id }, function (err, userProfile) {
                if (userProfile != null) {
                    if (userProfile.secq == userdetails.question && userProfile.seca == userdetails.answer && userProfile.verified == true) {
                        user.password = userdetails.newPassword;
                        user.save(function (err, user) {
                            if (err) { res.send("Server error"); }
                            else {

                                mailOptions = {
                                    to: userProfile.email,
                                    subject: "Do Not Reply : Password Recovery",
                                    html: "Hello,<br> <br> your password is now changed to : " + user.password
                                }
                                smtpTransport.sendMail(mailOptions, function (error, response) {
                                    if (error) {
                                        res.send("Server error");
                                    } else {
                                        res.send("ok");
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.send("Incorrect answer!!");
                    }
                }
            })
        } else {
            res.send("User not registered in system");
        };
    });
});

/*************************************************** ~~ UpdateUserInfo ~~***********************************************/

app.post("/updateUserInfo", function (req, res) {

    var userdetails = req.body;
    UserProfileModel.findOne({ userId: userdetails.userId }, function (err, userProfile) {
        if (userProfile != null) {
            userProfile.firstname = userdetails.firstname;
            userProfile.lastname = userdetails.lastname;
            userProfile.phone = userdetails.phone;
            userProfile.secq = userdetails.secq;
            userProfile.seca = userdetails.seca;
            userProfile.save(function (err, user) {
                if (err) {
                    res.send("Error");
                } else {
                    res.send(userProfile);

                }
            });
        }
    });
});


app.post("/changePassword", function (req, res) {

    var userdetails = req.body;

    AuthenticationModel.findOne({ _id: userdetails.userId, password: userdetails.password }, function (err, user) {
        if (user != null) {

            user.password = userdetails.newPassword;
            user.save(function (err, user) {
                if (err) {
                    res.send("Error");
                } else {
                    UserProfileModel.findOne({ userId: userdetails.userId }, function (err, userProfile) {
                        if (userProfile != null) {
                            mailOptions = {
                                to: userProfile.email,
                                subject: "Do Not Reply : Password Recovery",
                                html: "Hello,<br> <br> your password is now changed to : " + user.password
                            }
                            smtpTransport.sendMail(mailOptions, function (error, response) {
                                if (error) {
                                    res.send("Mail error");
                                } else {
                                    res.send("ok");
                                }
                            });
                        }
                    })
                }
            });

        } else {
            res.send("Incorrect Details");
        };
    });
});

/*************************************************** ~~ LogedIn Users ~~***********************************************/

app.post("/allOtherRegisteredUsers", function (req, res) {
    var currentUser = req.body;
    var registeredUsers = [];

    UserProfileModel.find({}, function (err, userProfile) {

        for (index in userProfile) {
            if (userProfile[index].userId != currentUser.userId) {
                var registeredUser = { 'userId': userProfile[index].userId, 'firstname': userProfile[index].firstname, 'lastname': userProfile[index].lastname, 'online': userProfile[index].online };
                registeredUsers.push(registeredUser);
            }
        }
        res.send(req.isAuthenticated() ? registeredUsers : null);
    })
});


/*************************************************** ~~ Messaging Service ~~***********************************************/

app.get("/messages", function (req, res) {
    var currentUser = req.user;

    MessageModel.find({ $or: [{ 'from': currentUser.userId }, { 'to': currentUser.userId }] }, function (err, messages) {

        res.send(req.isAuthenticated() ? messages : null);
    });

});


app.post("/sendMessage", function (req, res) {

    var messageRequest = req.body;

    var from = messageRequest.from.userId;
    var to = messageRequest.to.userId;
    var message = messageRequest.message;

    var messageRecord = { from: from, to: to, message: message };

    var messageObject = new MessageModel(messageRecord);

    messageObject.save(function (err, resp) {
        if (err) {
            res.send("error");
        }
        else {
            res.send("ok");
        }
    })
});

/*************************************************** ~~ EMAIL APP ~~***********************************************/

app.post("/sendEmail", function (req, res) {

    var email = req.body;

    var from = email.from;
    var to = email.to;
    var subject = email.subject;
    var mail = email.mail;
    var pass = email.password;


    var userSmtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: from,
            pass: pass
        }
    });

    var mailOptions = {
        to: to,
        subject: subject,
        text: mail
    }

    userSmtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.send("error");
        } else {
            res.send("ok");
        }
    })

});


/*************************************************** ~~ Save Widget Changes~~***********************************************/

app.post("/saveWidgetChanges", function (req, res) {

    var user = req.body;
    WidgetDataModel.findOne({ userId: user.userId }, function (err, userWidgets) {
        if (user.widgetName == "background") {
            userWidgets.background = user.widget;

            userWidgets.save(function (err, user) {
                if (err) {

                    res.send("error");
                } else {
                    res.send(userWidgets.background);
                }
            });
        } else if (user.widgetName == "notepad") {
            userWidgets.notepad = user.widget;

            userWidgets.save(function (err, user) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(userWidgets.notepad);
                }
            });
        } else if (user.widgetName == "youtube") {
            userWidgets.youtube = user.widget;

            userWidgets.save(function (err, user) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(userWidgets.youtube);
                }
            });
        } else if (user.widgetName == "email") {
            userWidgets.email = user.widget;

            userWidgets.save(function (err, user) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(userWidgets.email);
                }
            });
        } else if (user.widgetName == "browser") {
            userWidgets.browser = user.widget;

            userWidgets.save(function (err, user) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(userWidgets.browser);
                }
            });
        } else if (user.widgetName == "all") {

            userWidgets.taskbar = user.taskbar;
            userWidgets.google = user.google;
            userWidgets.notepad = user.notepad;
            userWidgets.browser = user.browser;
            userWidgets.youtube = user.youtube;
            userWidgets.textToSpeach = user.textToSpeach;
            userWidgets.calculator = user.calculator;
            userWidgets.setting = user.setting;
            userWidgets.message = user.message;
            userWidgets.weather = user.weather;
            userWidgets.stopWatch = user.stopWatch;
            userWidgets.email = user.email;

            userWidgets.save(function (err, user) {
                if (err) {
                    res.send("error");
                } else {
                    res.send("ok");
                }
            });
        };

    });
});


/*************************************************** ~~ ADMIN LOGIN ~~***********************************************/


passport.use('AdminAuthentication', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done) {
        if (username == "iamadmin" && password == "iamtheadmin") {
            return done(null, "ok");
        } else {
            return done(null, false, { message: 'Unable to login' });
        }
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/adminlogin", passport.authenticate('AdminAuthentication'), function (req, res) {

    res.send("ok");

});

app.get("/adminlogout", function (req, res) {
    req.session.destroy();
    res.send("ok");
});

app.get("/adminGetData", function (req, res) {
    if (req.isAuthenticated()) {
        AuthenticationModel.find({}, function (err, auth) {

            UserProfileModel.find({}, function (err, prof) {

                MessageModel.find({}, function (err, msg) {

                    WidgetDataModel.find({}, function (err, widget) {
                        var data = { 'auth': auth, 'prof': prof, 'msg': msg, 'widget': widget };
                        res.send(data);
                    });
                });
            });
        });
    } else {
        res.send("<h1>Unauthorized</h1>");
    }
});


app.post("/adminDeleteAllData", function (req, res) {
    if (req.isAuthenticated()) {
        var data = req.body;
        var type = data.type;
        if (type == "user") {
            AuthenticationModel.remove({}, function (err, auth) { res.send("ok") });
        } else if (type == "profile") {
            UserProfileModel.remove({}, function (err, prof) { res.send("ok") });
        } else if (type == "message") {
            MessageModel.remove({}, function (err, msg) { res.send("ok") });
        } else if (type == "widget") {
            WidgetDataModel.remove({}, function (err, wid) { res.send("ok") });
        }
    } else {
        res.send("<h1>Unauthorized</h1>");
    }
});

app.post("/adminDeleteData", function (req, res) {
    if (req.isAuthenticated()) {
        var data = req.body;

        var type = data.type;

        var userId = data.id;

        if (type == "user") {
            AuthenticationModel.remove({ _id: userId }, function (err, auth) { res.send("ok") });
        } else if (type == "profile") {
            UserProfileModel.remove({ userId: userId }, function (err, prof) { res.send("ok") });
        } else if (type == "message") {
            MessageModel.remove({ $or: [{ 'from': userId }, { 'to': userId }] }, function (err, msg) { res.send("ok") });
        } else if (type == "widget") {
            WidgetDataModel.remove({ userId: userId }, function (err, wid) { res.send("ok") });
        }
    } else {
        res.send("<h1>Unauthorized</h1>");
    }
});

app.delete("/adminClearDb", function (req, res) {

    if (req.isAuthenticated()) {
        AuthenticationModel.remove({}, function (err, auth) {});

        UserProfileModel.remove({}, function (err, profile) { });

        MessageModel.remove({}, function (err, msg) { });

        WidgetDataModel.remove({}, function (err, widget) { });

        res.send("ok")

    } else {
        res.send("<h1>Unauthorized</h1>");
    }
});

app.get("/adminLoggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});


/*************************************************** ~~ LISTNER ~~***********************************************/

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);

/****************************************************************************************************************/
