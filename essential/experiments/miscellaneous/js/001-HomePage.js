$(function () {
    // Displaying time on loading
    timeDate();

    //Updating time every 1000milliseconds
    setInterval(timeDate, 1000);

    $(document).click(goToLoginPage);
});


function timeDate() {

    var dateObj = new Date();

    // Time
    var time = dateObj.getHours() + ":" + dateObj.getMinutes();

    //Date
    var date = dateObj.getDay();

    // Day
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[dateObj.getDay()];

    // Month
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[dateObj.getMonth()];
    
    // Complete Date as string
    var completeDate = day + ", " + month + " " + (date+1);

    // Updating Time on to Screen
    $("#time")
        .html(time)
        .css('font-family', 'Arial')
        .css('font-size', '80px')
        .css('color', 'white')
        .appendTo('#time-date');

    // Updating Date on to Screen
    $("#date")
        .html(completeDate)
        .css('font-family', 'Arial')
        .css('font-size', '60px')
        .css('color', 'white')
        .appendTo('#time-date');
}


function goToLoginPage() {
  //  $.mobile.pageContainer.pagecontainer("change", "003-LoginPage.html", { transition: "slideup" });
}