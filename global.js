/*
The primary purpose of this script is to set/add elements to webpages that are basically universal to my website layout
with some exceptions, so that I don't have to constantly change stuff like the navigation bar.
*/
//Got to figure out a different way to set universal elements because
//professional standards this is kind of unorthodox

document.addEventListener("DOMContentLoaded", () => {
    const navBar = document.getElementById('navbar');

    if(navBar) {//checks to see if navBar actually exists
        navBar.innerHTML =
        `  
        <div id = "heading-title" >The Ultimate Website</div>
        <nav class = "nav-links"><!--each of the links will have an image attached to them to make the site more intuitive-->
            <a href = "index.html">Home<img src = "sprites/Home Icon-20261026-120210-frame0.png"></a>
            <a href = "converting.html">File Conversions<img src = "sprites/File Icon-20261026-120218-frame0.png"></a>
            <a href = "pixel-sandbox.html">Pixel Art Sandbox<img src = "sprites/Sandbox-20261026-120200-frame0.png"></a>
            <a href = "aboutme.html">About the Author<img src = "sprites/Author-20261026-115625-frame0.png"></a>
        </nav>
        `
    }
});

