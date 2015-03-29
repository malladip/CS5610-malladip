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

mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/practice');

/****************************************************************************************************************/

/*****************************************008-EmailApp.html******************************************/


app.get("/EmailApp", function (req, res) {
    res.sendfile(__dirname + '/public/008-EmailApp.html');
});

var EmailAppUsersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email:String
}, { collection: "EmailAppUser" });

var EmailAppUsersModel = mongoose.model("EmailAppUsersModel", EmailAppUsersSchema);

passport.use('EmailAppUser', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},

    function (username, password, done) {
        EmailAppUsersModel.findOne({ username: username, password: password }, function (err, user) {
            if (user != null) {
                return done(null, user);
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

app.post("/EmailApp/login", passport.authenticate('EmailAppUser'), function (req, res) {

    var user = req.user;

    res.json(user);
});

app.post("/EmailApp/logout", function (req, res) {

    //req.logout();
    req.session.destroy();

    res.send(200);
});

app.post("/EmailApp/register", function (req, res) {

    console.log("server ");
    var newUser = req.body;
    EmailAppUsersModel.findOne({ username: newUser.username }, function (err, user) {

        if (err) { return next(err); }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new EmailAppUsersModel(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
    });
});

app.get("/EmailApp/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post("/EmailApp/send", function (req, res) {

    var from = req.body.from;
    var to = req.body.pass;

    var smtpTransport1 = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: from,
            pass: to
        }
    });

    var mailOptions = {
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.mail
    }

    smtpTransport1.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.send("error in sending");
        } else {
            res.send("ok");
        }
    })
});



/*****************************************007-PositionOfWidget.html******************************************/

app.get("/PositionOfWidget", function (req, res) {
    res.sendfile(__dirname + '/public/007-PositionOfWidget.html');
});

var PositionOfWidgetSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "PositionOfWidget" });

var PositionOfWidgetModel = mongoose.model("PositionOfWidgetModel", PositionOfWidgetSchema);

passport.use('PositionOfWidget', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},

    function (username, password, done) {
        PositionOfWidgetModel.findOne({ username: username, password: password }, function (err, user) {
            if (user != null) {
                return done(null, user);
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

app.post("/PositionOfWidget/login", passport.authenticate('PositionOfWidget'), function (req, res) {

    var user = req.user;
    res.json(user);
});

app.post("/PositionOfWidget/logout", function (req, res) {

    //req.logout();
    req.session.destroy();
    res.send(200);
});

app.post("/PositionOfWidget/register", function (req, res) {

    console.log("server ");
    var newUser = req.body;
    PositionOfWidgetModel.findOne({ username: newUser.username }, function (err, user) {

        if (err) { return next(err); }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new PositionOfWidgetModel(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
    });
});

app.get("/PositionOfWidget/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

var PositionWidgetLocationSchema = new mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    elemid: mongoose.Schema.Types.ObjectId,
    position: mongoose.Schema.Types.Mixed
}, { collection: "PositionWidgetLocation" });

var PositionWidgetLocationModel = mongoose.model("PositionWidgetLocationModel", PositionWidgetLocationSchema);

app.post("/PositionOfWidget/save", function (req, res) {

    var elements = req.body;

    for(e in elements){

        var element = elements[e];

        console.log("id " + element.id);
        console.log("id " + element.id);

        PositionWidgetLocationModel.findOne({userid: element.id, elemid: element.elemId }, function (err, elem) {
            if (err) { return next(err); }
            if (elem != null)
            {
                
                elem.position = element.position;
                elem.save(function (err) {
                    if (err) return handleError(err);
                    console.log("saved updated");
                });

            }
            else
            {
                var el = { 'userid': element.id, 'elemid': element.elemId, 'position': element.position};
                var newElem = new PositionWidgetLocationModel(el);
                newElem.save(function (err) {
                    if (err) return handleError(err);
                    console.log("saved first");
                });
            }
        });
    }
});

/*****************************************006-email.html******************************************/

app.get("/email", function (req, res) {
    res.sendfile(__dirname + '/public/006-email.html');
});


var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "prashantwidgets@gmail.com",
        pass: "prashantproject"
    }
});

app.post("/email/send", function (req, res) {

    var mailOptions = {
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.mail
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.send("error in sending");
        } else {
            res.send("ok");
        }
    })
    
});

/*****************************************005-LoggedInUsers.html******************************************/

app.get("/LoggedInUsers", function (req, res) {
    res.sendfile(__dirname + '/public/005-LoggedInUsers.html');
});

var LoggedInUsers_CurrentlyLoggedInUSers = [];


var LoggedInUsersSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "LoggedInUsersUser" });

var LoggedInUsersModel = mongoose.model("LoggedInUsersModel", LoggedInUsersSchema);

passport.use('LoggedInUsers', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},

    function (username, password, done) {
        LoggedInUsersModel.findOne({ username: username, password: password }, function (err, user) {
            if (user != null) {
                return done(null, user);
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

app.post("/LoggedInUsers/login", passport.authenticate('LoggedInUsers'), function (req, res) {

    var user = req.user;

    LoggedInUsers_CurrentlyLoggedInUSers.push(user.username);
    res.json(user);
});

app.post("/LoggedInUsers/logout", function (req, res) {

    //req.logout();
   req.session.destroy();

   var index = LoggedInUsers_CurrentlyLoggedInUSers.indexOf(req.user.username);
   LoggedInUsers_CurrentlyLoggedInUSers.splice(index, 1);

   res.send(200);
});

app.post("/LoggedInUsers/register", function (req, res) {

    console.log("server ");
    var newUser = req.body;
    LoggedInUsersModel.findOne({ username: newUser.username }, function (err, user) {

        if (err) { return next(err); }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new LoggedInUsersModel(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
    });
});

app.get("/LoggedInUsers/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.get("/LoggedInUsers/loggedinUsers", function (req, res) {
    res.send(req.isAuthenticated() ? LoggedInUsers_CurrentlyLoggedInUSers : null);
});

/*****************************************004-PassportAuthentication.html******************************************/

app.get("/PassportAuthentication", function (req, res) {
    res.sendfile(__dirname + '/public/004-PassportAuthentication.html');
});

var PassportAuthenticationUser = [
    { username: "admin", password: "admin", notes: ["First note", "Second Note"] }
];

var PassportAuthenticationUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    notes: [String]
}, { collection: "PassportAuthenticationUser" });

var PassportAuthenticationUserModel = mongoose.model("PassportAuthenticationUser", PassportAuthenticationUserSchema);

passport.use('PassportAuthentication', new LocalStrategy(
    function (username, password, done) {
        //  for (var u in PassportAuthenticationUser) {
        //      if (username == PassportAuthenticationUser[u].username && passowrd == PassportAuthenticationUser[u].password) {
        //          return done(null, PassportAuthenticationUser[u]);
        //      }
        //}
        PassportAuthenticationUserModel.findOne({ username: username, password: password }, function (err, user) {
            if (user) {
                return done(null, user);
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

var auth = function (req, res, next) {
    if (!(req.isAuthenticated())) {
        res.send(401);
    } else {
        next();
    }
};

app.get('/PassportAuthentication/rest/user', auth, function (req, res) {
    res.json(PassportAuthenticationUser);
});

app.post("/PassportAuthentication/login", passport.authenticate('PassportAuthentication'), function (req, res) {
    var user = req.user;
    res.json(user);
});

app.post("/PassportAuthentication/logout", function (req, res) {
    //req.logout();
    req.session.destroy();
    res.send(200);
});

app.post("/PassportAuthentication/register", function (req, res) {
    var new_user = new PassportAuthenticationUserModel(req.body);
    new_user.save(function (err, user) {

        var registeredUser = { 'username': user.username, 'password': user.password };
        // passport.login(registeredUser);
        res.json(user);
    });
});

app.get("/PassportAuthentication/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

/*****************************************003-LoginRegisterMongodb.html******************************************/

var UserLoginSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "userlogin" });

var UserLogin = mongoose.model("UserLogin", UserLoginSchema);

app.get("/LoginRegisterMongodb", function (req, res) {
    res.sendfile(__dirname + '/public/003-LoginRegisterMongodb.html');
});

app.get("/LoginRegisterMongodb/login/:username/:password", function (req, res) {

    var username = req.params.username;
    var password = req.params.password;

    UserLogin.find({ username: username }, function (err, data) {
        if (data.length > 0 && data[0].password == password) {
            res.json(data[0].username);
        }
        else {
            res.status(500).send('Incorrect details');
        }
    }
   );
});

app.post("/LoginRegisterMongodb/register/:username/:password", function (req, res) {

    var username = req.params.username;
    var password = req.params.password;

    var userlogin = new UserLogin({ username: username, password: password });

    userlogin.save();

    res.json(username);
});

/****************************************************************************************************************/

var user = [
    { username: "admin", password: "admin", notes: ["First note", "Second Note"] }
];

app.get("/", function (req, res) {
    res.sendfile(__dirname + '/public/001-Notes.html');
});

app.get("/experiment1", function (req, res) {
    res.sendfile(__dirname + '/public/001-Notes.html');
});

app.get("/experiment2", function (req, res) {
    res.sendfile(__dirname + '/public/002-HelloNodeJS.html');
});

app.get("/experiment2/getresponce", function (req, res) {
    res.send('Hi! this is the responce from the server!! success!!');
});

app.get("/user", function (req, res) {
    res.json(user);
});

app.get("/login/user/:username/:password", function (req, res) {

    var username = req.params.username;
    var password = req.params.password;

    for (u in user) {
        if (user[u].username == username && user[u].password == password) {
            res.json(user[u]);
        }
    }
    res.status(500).send('Incorrect details');
});

app.post("/register/user/:username/:password", function (req, res) {

    var username = req.params.username;
    var password = req.params.password;

    for (u in user) {
        if (user[u].username == username) {
            res.status(500).send('Username already taken');
        }
    }

    var new_user = { username: username, password: password, notes: [] };
    user.push(new_user);
    res.json(new_user);
});

app.post("/newNote/:username/:note", function (req, res) {

    var username = req.params.username;
    var note = req.params.note;

    for (u in user) {
        if (user[u].username == username) {
            user[u].notes.push(note);

            res.json(user[u]);
        }
    }
    res.status(500).send('Error in adding note');
});

app.post("/deleteNote/:username/:index", function (req, res) {

    var username = req.params.username;
    var index = req.params.index;

    for (u in user) {
        if (user[u].username == username) {
            user[u].notes.splice(index, 1);
            res.json(user[u]);
        }
    }
    res.status(500).send('Error in deleting note');
});


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);