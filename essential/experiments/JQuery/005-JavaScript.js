$(function () {

    $("#video-link").draggable().resizable();

    $("#go").click(embed);
})


function embed() {
    var new_link = newLink();

 //   var draggable_div = $("<div>")
    //    .attr('class', 'video thumbnail')
   //     .resizable()
    //    .attr('draggable','true')
     //   .appendTo('#exp_container');

    var new_iframe = $("<iframe />")
        .attr('class', 'video thumbnail')
        .attr('src', new_link)
        .attr('frameborder', '0')
        .css('float', 'left')
    // .appendTo(draggable_div);
    .appendTo('#exp_container');;
        
}

function newLink() {

        var given_video_link = $("#video-link").val();

        var basic_embed_code = "https://www.youtube.com/embed/";

        var split = given_video_link.split("=");

        var key_element = split[1];

        return (basic_embed_code + key_element);

}