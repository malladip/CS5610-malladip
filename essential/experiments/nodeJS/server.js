var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());   //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer()); // for parsing multipart/form-data

app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/practice');

/****************************************************************************************************************/


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
    notes:[String]
}, { collection: "PassportAuthenticationUser" });

var PassportAuthenticationUserModel = mongoose.model("PassportAuthenticationUser", PassportAuthenticationUserSchema);

passport.use(new LocalStrategy(
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

app.post("/PassportAuthentication/login", passport.authenticate('local'), function (req, res) {
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
    res.send(req.isAuthenticated()?req.user:'0');
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