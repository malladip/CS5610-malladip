<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Demo Home Page</title>

    <link rel="stylesheet" href="css/jquery-ui.css" />
    <script src="javascript/jquery.js"></script>
    <script src="javascript/jquery-ui.js"></script>

    <!-- Latest compiled aznd minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

    <script src="js/001-HomePage.js"></script>

    <link rel="stylesheet" href="css/HomePage.css" />

</head>

<body>

    <div class="container box">

        <form id="form1" runat="server">

            <div id="navigation">
                <a href="#" class="button">Home</a>
                <a href="sitestatistics/" target="_blank" class="button">SiteStatistics</a>
                <a href="statistics/" target="_blank" class="button">Statistics</a>
                <a href="source/" target="_blank" class="button">Source</a>
                <a href="search/" target="_blank" class="button">Search</a>
                <a href="searchtree/" target="_blank" class="button">SearchTree</a>
                <a href="textview/" target="_blank" class="button">TextView</a>
                <a href="filelist.aspx" target="_blank" class="button">FileList</a>
                <a href="autofile.aspx" target="_blank" class="button">AutoFile</a>
                <a href="images/autoimage.aspx" target="_blank" class="button">Images</a>
            </div>

            <hr />

            <p>
                <img id="my_pic" class="thumbnail" src="images/my_pics/prashant.jpg" alt="Image of Prashant Malladi" />
            </p>


            <div id="content">

                <p>This is <a href="https://www.linkedin.com/pub/prashant-malladi/34/226/772" target="_blank">Prashant Malladi</a>. I am currently doing my Masters at Northeastern University in Computer Science. This Website is being developed as a part of the course "CS5610: Web Development" instructed by <a href="https://www.linkedin.com/in/joseannunziato" target="_blank">Prof. Jose Annunziato</a>.</p>
                <p>
                    In this course, I intend to learn the .NET and MEAN stack concepts and do a relavent project.
                </p>
                <hr />

                <a href="story/index.htm?../experiments/story.txt" target="_blank" class="exp">
                    <p>Experments</p>
                    <img class="gif thumbnail" src="http://api.ning.com/files/DtcI2O2Ry7AtMW7cviZKlBu6fnKhOqg*F8cTuIdq-skQveFgHJKuL6ahxecOdD4La6cTgzSRM5ysEVfQw5kdfx0y2QUp0Sg7/1082123542.gif" />
                </a>

                <a class="project">
                    <p>Project</p>
                    <img class="gif thumbnail" src="http://www.textfiles.com/underconstruction/CoColosseumDugout6041imagesconstruction.gif" />
                </a>

                <a href="blog/" target="_blank" class="blog">
                    <p>Blog</p>
                    <img class="gif thumbnail" src="https://xtrunner.files.wordpress.com/2014/11/gif20.gif" />
                </a>

                <a href="https://github.com/malladip/CS5610-malladip/tree/master/essential" target="_blank" class="git">
                    <p>GitHub</p>
                    <img class="gif thumbnail" src="http://daniel.gd/wp-content/uploads/2015/02/daftpunktocat-thomas.gif" />
                </a>
            </div>

        </form>

    </div>

    <footer>
        <p id="footer" class="text-center">Copyright © Prashant Malladi, 2015. All rights reserved.</p>
    </footer>

</body>
</html>
