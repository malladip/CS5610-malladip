$(function () {
    $("#admin").click(adminClicked);

    $("#guest").click(guestClicked);
});

function guestClicked() {
        
    $("#guest").css('-webkit-transform', 'scale(1.3)');

    this.disabled = true;

    $("#admin").remove();

}

function adminClicked() {

    $("#admin").css('-webkit-transform', 'scale(1.3)')

    this.disabled = true;

    $("#guest").remove();
        
    addAdminLoginFields();
       
}

function addAdminLoginFields(){

    var loginContentDiv = $("<div>")
        .attr('id', 'loginFields')
        .attr('class', 'col-lg-6')
        .appendTo('#login_content');

    var form = $("<form>")
        .appendTo(loginContentDiv);

    var username_para = $("<p>")
        .appendTo(loginContentDiv);

    var username = $("<input />")
        .attr('type', 'text')
        .attr('id', 'username')
        .attr('name', 'username')
        .attr('placeholder', 'Username')
        .attr('class', 'form-control')
        .css('width','100%')
        .appendTo(username_para);

    var password_para = $("<p>")
        .appendTo(loginContentDiv);

    var password = $("<input />")
        .attr('type', 'password')
        .attr('id', 'password')
        .attr('name', 'password')
        .attr('placeholder', '**********')
        .attr('class', 'form-control')
        .css('width', '100%')
        .appendTo(password_para);

}