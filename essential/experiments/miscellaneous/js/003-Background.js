$(function () {
    enterUrl();
});

function enterUrl() {


    var div = $("<div>");

    var label = $("<label/>")
    .attr('id', 'urlLabel')
    .html('Image URL')
    .appendTo(div);

    var url = $("<input/>")
    .attr('id', 'url')
    .attr('name', 'url')
        .attr('type', 'text')
    .appendTo(div);

    div.dialog({
        title: "Image URL",
        buttons: [
          {
              text: "Ok",
              icons: {
                  primary: "ui-icon-heart"
              },
              click: function () {
                  changeBackground($("#url"));
                  $(this).dialog("close");
              }

              // Uncommenting the following line would hide the text,
              // resulting in the label being used as a tooltip
              //showText: false
          }
        ]
    });
}


function changeBackground(url) {
   
    urlText = "url(" + url.val() + ")";
    $("body").css('background-image', urlText);
}