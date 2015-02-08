<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />

<title>Demo Home Page</title>

<style type="text/css">
    ul.master_navigation
    {
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        list-style: none;
        margin: 0.5em 0;
        padding: 0;
    }

    ul.master_navigation li
    {
        display: inline-block;
        padding: 0 0.5%;
    }

    a
    {
        color: #08f;
        font-weight: bold;
        text-decoration: none;
    }

    a:visited
    {
        color: #88f;
    }

    a:hover
    {
        color: #f00;
    }

    p
    {
        text-align: justify;
    }
    
    
    body {
        max-width: 100%;
        margin: 0;
        padding: 0;
        background-image: url(images/backgrounds/grey.jpg);

    }

    .pad {
        padding: 10px;
    }

</style>

</head>

<body>
  
<div class="pad">

<form id="form1" runat="server">

<div>
<ul class="master_navigation">
    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
    <li><a href="statistics/" target="_blank">Statistics</a></li>
    <li><a href="source/" target="_blank">Source</a></li>
    <li><a href="search/" target="_blank">Search</a></li>
    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
    <li><a href="textview/" target="_blank">TextView</a></li>
    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
    <li><a href="blog/" target="_blank">Blog</a></li>
    <li><a href="story/index.htm?../experiments/story.txt" target="_blank">Experiments</a></li>
    <li><a href="https://github.com/malladip/CS5610-malladip/tree/master/essential" target="_blank">GitHub</a></li>
</ul>
<hr />
<p>
    <center><img src="images/my_pics/prashant.jpg" alt="Image of Prashant Malladi"></center>    
</p>


<p>
    This is Prashant Malladi. I am currently doing my Masters at Northeastern University in Computer Science. This Website is being developed as a part of the course "CS5610: Web Development" instructed by Prof. Jose Annunziato.
</p>

<hr />

</div>

</form>

</div>

<footer>
<p><center>Copyright © Prashant Malladi, 2015. All rights reserved.</center></p>
</footer>

</body>
</html>
