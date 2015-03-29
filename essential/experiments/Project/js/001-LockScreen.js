app.controller("LockCtrl", function ($scope, $interval, $location) {

    // Setting time for the first load
    var dateObj = new Date();
    $scope.time = getTime(dateObj);
    $scope.date = getDate(dateObj);

    // Making time change every 1000 milliseconds.
    $interval(function () {
        dateObj = new Date();
        $scope.time = getTime(dateObj);
        $scope.date = getDate(dateObj);
    }, 1000);

    $(document).click(function () {
        $('body').css('background-image', 'none');
        $('body').css('background-color', 'darkblue');
        $location.url("/login");
    });

});

var getTime = function (dateObj) {
    var minutes = dateObj.getMinutes();
    return ((((dateObj.getHours() + 11) % 12) + 1) + ":" + (minutes > 9 ? "" + minutes : "0" + minutes) + " " + (dateObj.getHours() >= 12 ? 'PM' : 'AM'));
};

var getDate = function (dateObj) {

    //Date
    var date = dateObj.getDate();

    //Day
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
    var completeDate = day + ", " + month + " " + date;
            
    return completeDate;
};
