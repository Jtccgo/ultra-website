
The Ultimate Website
Welcome to The Ultimate Website, a client-side website made to provide integral everyday digital utilities without having to rely on external cloud servers or paid subscriptions.
Made with modern web tools, this application runs purely in you browser, ensuring speed, privacy, and offline capability.

Features: 
    - Pixel Art Sandbox
        -Uses the html canvas to simulate a pixel sandbox
        -The resolution can be customly sized
        -Pencil and Eraser tools
        -Clear button
        -Can pick the color of the Pencil
    - File Converter
        -Uses FFmpeg to convert video and audio files quickly and efficiently
        -Can convert a large variety of files, to be precise 25 types
        -Use cloudfare to convert document files into PDFs
        -The quality for images can be adjusted
        -Converts images using the HTML canvas for broad browser support
        -Is client based so files don't have to be transcoded in a server, making it very convienient
    - Draggable Widgets

        -Can be dynamically moved by grabbing the 3 bar lines 
        -Useful info relating to the current web page
        -Can be utilized as sidebars with additional features 
Technology Stack:
    - Frontend:
        -HTML5
        -CSS3(Flexbox, CSS Variables, Reponsive Media Queries)
        -Native JavaScript(ES6+)
    -Libraries & APIs:
        -FFmpeg.wasm v0.11.6(https://github.com/ffmpegwasm/ffmpeg.wasm): In browser audio & video processing
        -jsPDF v2.5.1(https://github.com/parallax/jsPDF): Client-side PDF generation
        -HTML5 Canvas API: Pixel grid rendering and client-side image translation
        -Inter Google Font: Concise, modern fonts
How to run locally
Since this project relies on Javascript and WebAssembly, it should be operated on a local HTTP web server rather than a .html file 

Primary Method: VS Code Live Server
    1.Open the repository folder in Visual Studio Code
    2.Install the Live Server extension
    3. Right-click on index.html and select "Open with Live Server" or do the same thing without right clicking
    4.The sit will launch at http://127.0.0.1:550
Alternative Method: Node.js http-server/npx
    1.Open a terminal in the root of the project
    2. Run the command: npx http-server -p 8080
    3.Open http://localhost:8080 in your browser

How to use:
    To navigate the site us the global top navigation bar to jump between Home, File Conversions, Pixel Art Sandbox, and About the Author pages. 
    To drag widgets click and hold the 3 gray bars of the floating window to drag it ANYWHERE on the screen.
    To draw pixel art:
        -Go to the Pixel Art Sandbox page
        -Click Pencil or Eraser to switch tools
        -Pick a color usisng the color input
        -Click or drag across the canvas to draw
        -Click Download to save your creation
    To convert files:
        -Go to the File Conversions page
        -Select the file category(out of Audio, Video, Image, and Document)
        -Choose your desired format in the dropdown
        -Upload a SINGLE file of the given file category you chose
        -Click Convert to process and download your file
        -A progress bar will appear and the file will be automatically downloaded at 100%

Author: Jtccgo 
