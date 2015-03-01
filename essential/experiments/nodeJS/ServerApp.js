var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'));


var user = [
    { username: "admin", password: "admin", notes: ["First note", "Second Note"] }
];

app.get("/", function (req, res) {
    res.sendfile(__dirname + '/public/001-Notes.html');
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
            user[u].notes.splice(index,1);
            res.json(user[u]);
        }
    }
    res.status(500).send('Error in deleting note');
});

app.listen(3000);