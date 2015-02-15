$(function () {

    $("#go").click(saveName);
});



function saveName() {
    if (typeof (Storage) != "undefined") {
        if (localStorage.name) {
            localStorage.name = document.getElementById("name").value;
        } else {
            localStorage.name = "No name entered";
        }
        document.getElementById("message").innerHTML = "Welcome back " + localStorage.name;
        $("#message").dialog();
    } else {
        document.getElementById("message").innerHTML = "Sorry, your browser does not support web storage...";
        $("#message").dialog();
    }
}
function loadName() {
    if (localStorage.name != null) {
        document.getElementById("message").innerHTML = "Welcome back " + localStorage.name;
        $("#message").dialog();

    }
}