$(function () {
    $("#admin").click(function () {
        $("#admin").animate({
            height: '180px',
            width: '180px'
        })

        this.disabled = true;
        $("#guest").remove();
        
        var username = "<input type=\"text\" id=\"username\" name=\"username\" placeholder=\"Username\" />";
        var password = "<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"**********\" />";

        $("#username").css("width", "100%");
        $("#password").css("width", "100%");
        $("#login_content").append(username);
        $("#login_content").append(password);
    });



    $("#guest").click(function () {
        $("#guest").animate({
            height: '180px',
            width: '180px'
        })

        this.disabled = true;
        $("#admin").remove();
    });
});