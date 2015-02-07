$(function () {
    setInterval(function () {
        var dateObj = new Date();

        var time = dateObj.toLocaleTimeString();

        $("#local-time").find("#time").html(time);

        var month = dateObj.getMonth();
        $("#date").find("#month").html(month + 1);

        var day = dateObj.getDay();
        $("#date").find("#day").html(day+1);

        var year = dateObj.getFullYear();
        $("#date").find("#year").html(year);

    }, 1000);
});