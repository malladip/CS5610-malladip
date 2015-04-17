<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Demo Home Page</title>

    <link rel="stylesheet" href="css/HomePage.css" />

</head>

<body>

    <div id="container">

        <nav>
            <div id="navigation">
                <a href="#" class="navButton">Home</a>
                <a href="sitestatistics/" target="_blank" class="navButton">SiteStatistics</a>
                <a href="statistics/" target="_blank" class="navButton">Statistics</a>
                <a href="source/" target="_blank" class="navButton">Source</a>
                <a href="search/" target="_blank" class="navButton">Search</a>
                <a href="searchtree/" target="_blank" class="navButton">SearchTree</a>
                <a href="textview/" target="_blank" class="navButton">TextView</a>
                <a href="filelist.aspx" target="_blank" class="navButton">FileList</a>
                <a href="autofile.aspx" target="_blank" class="navButton">AutoFile</a>
                <a href="images/autoimage.aspx" target="_blank" class="navButton">Images</a>
            </div>
        </nav>
        <div class="content">


            <h1 class="heading">Welcome to my Website</h1>
            <hr />

            <div class="profilePic">
                <img id="my_pic" class="thumbnail" src="images/my_pics/prashant.jpg" alt="Image of Prashant Malladi" />
            </div>

            <div class="text">
                <p>
                    Hi guys!! I am Prashant Malladi. 
                       I am currently doing my Masters at Northeastern University in Computer Science.
                </p>
                <p>
                    This website is developed as a part of the course "CS5610: Web Development" 
                         instructed by 
                        <a href="https://www.linkedin.com/profile/view?id=6343770&authType=NAME_SEARCH&authToken=mQ9u&locale=en_US&trk=tyah&trkInfo=clickedVertical%3Amynetwork%2Cidx%3A1-1-1%2CtarId%3A1427665120491%2Ctas%3Ajose+annun" target="_blank">Prof. Jose Annunziato</a>.
                </p>

                <p>
                    I have taken this course to learn technologies like AngularJS, NodeJs, MongoDB, and .NET
                   
                </p>
                <p>
                    I developed a Single Page Web Application called Widgets, using MEAN Stack as my project.
                </p>
                <p>
                    Here are some interesting stuff that I worked on during the semester:
                </p>
            </div>


            <div class="links">
                <a href="story/index.htm?../experiments/story.txt" target="_blank" class="exp">
                    <img src="images/random/experiments.png" />
                </a>
                <a href="project/Default.html" target="_blank" class="project">
                    <img src="images/random/project image.jpg" />
                </a>
                <a href="blog/" target="_blank" class="blog">
                    <img src="images/random/blog image.jpg" />
                </a>
                <a href="https://github.com/malladip/CS5610-malladip" target="_blank" class="git">
                    <img src="images/random/github image.jpg" />
                </a>
            </div>

        </div>
    </div>

    <footer>
        Copyright © Prashant Malladi, 2015. All rights reserved. |
        <a href="https://www.linkedin.com/pub/prashant-malladi/34/226/772" target="_blank">LinkedIn </a> |
        <a href="https://github.com/malladip" target="_blank">GitHub</a> |
        <a href="https://www.facebook.com/prashanth.malladi.7?=75876878" target="_blank">Facebook </a> 
    </footer>

</body>
</html>
