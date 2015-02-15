$(function () {
    
    $("#go").click(function () {

        var title = $("#movieName").val();

        $.ajax({
            url: "http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=1&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N",
            dataType: "jsonp",
            success: displayTitles
        });
    })
    
});


function displayTitles(movies) {
    $("#moviesList").empty();

    for (var m in movies)
    {
        var movie = movies[m];
        var poster = "<a href=" + movie.urlPoster + " target=\"_blank\">Poster</a>";
        var movieTag = "<li>" + movie.title + " - " + poster + "</li>";
        $("#moviesList").append(movieTag);

    }
};