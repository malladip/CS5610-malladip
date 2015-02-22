$(function () {

    $("#go").click(function () {
        var url = $("#url").val();
            
        $(".small").attr('src', url);

        var image_background = "url('"+ url + "') no-repeat";

        $(".large").css('background', image_background);
    });

    var initial_width = 0;
    var initial_height = 0;

    $(".magnify").mousemove(function (e) {
        if (!initial_width && !initial_height) {
            var image_object = new Image();
            image_object.src = $(".small").attr("src");
            initial_width = image_object.width;
            initial_height = image_object.height;
        }
        else {
            var magnify_offset = $(this).offset();
            var mx = e.pageX - magnify_offset.left;
            var my = e.pageY - magnify_offset.top;
            if (mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
                $(".large").fadeIn(100);
            }
            else {
                $(".large").fadeOut(100);
            }
            if ($(".large").is(":visible")) {
                var rx = Math.round(mx / $(".small").width() * initial_width - $(".large").width() / 2) * -1;
                var ry = Math.round(my / $(".small").height() * initial_height - $(".large").height() / 2) * -1;
                var bgp = rx + "px " + ry + "px";
                var px = mx - $(".large").width() / 2;
                var py = my - $(".large").height() / 2;
                $(".large").css({ left: px, top: py, backgroundPosition: bgp });
            }
        }
    })
})