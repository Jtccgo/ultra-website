
# The Ultimate Website

Welcome to **The Ultimate Website**, a client-side web application designed to provide integral everyday digital utilities without relying on external cloud servers or paid subscriptions. Built with modern web tools, it runs purely in your browser, ensuring speed, privacy, and offline capability.

<img width="815" height="665" alt="image" src="https://github.com/user-attachments/assets/3a7a91f2-62f8-41e5-8a1b-3e20c98fb8f2" />
<img width="1584" height="761" alt="image" src="https://github.com/user-attachments/assets/aab5adcf-f475-4405-b2dc-51bef6762829" />
<img width="1583" height="763" alt="image" src="https://github.com/user-attachments/assets/51e4b27e-db99-43a4-be24-93c29d4eba16" />
<img width="1596" height="898" alt="27d97191-f1db-444a-936d-1260deebd0dc" src="https://github.com/user-attachments/assets/431b170e-c937-4e53-819d-43dc4a6d2340" />
<img width="1599" height="899" alt="817f8641-7b80-4733-a38e-fad045c6f6e9" src="https://github.com/user-attachments/assets/eedae833-5acd-446a-beb1-e4144173d9a3" />
<img width="1599" height="899" alt="image" src="https://github.com/user-attachments/assets/cc75b424-8d52-48c1-ae8d-dd7feddf30dd" />
<img width="540" height="262" alt="The Ultimate Website; Nov 2, 9 40 PM" src="https://github.com/user-attachments/assets/7b968bb6-e1ec-4bbe-a57b-eb9bddafd83f" />

---

## Features

### 🎨 Pixel Art Sandbox
* Uses the HTML Canvas API to simulate a pixel art sandbox.
* Customizable canvas resolution.
* Pencil and Eraser tools with color selection.
* Clear button to reset your canvas.
* Download button to save your creations.

### 🔄 File Converter
* Uses **FFmpeg** to convert video and audio files quickly and efficiently.
* Supports a wide variety of formats (25+ types).
* Uses `jsPDF` to convert document files into PDFs.
* Client-side image conversion and compression using the HTML canvas for broad browser support and privacy.

### 🗂️ Draggable Widgets
* Dynamically movable by dragging the 3-bar handle.
* Displays useful info relating to the current web page.
* Can be utilized as sidebars with additional features.

### 🎮 Gamehub
* Features a responsive user UI
* Hosts games client-side
* Convenient options like fullscreen

### ⌛ General Utilities
* Everyday utilities so far including a stopwatch, timer, and local time
* I plan to add a digital measurement tool soon
* User-friendly layout 
---

## Technology Stack

* **Frontend:**
  * HTML5
  * CSS3 (Flexbox, CSS Variables, Responsive Media Queries)
  * Native JavaScript (ES6+)
* **Libraries & APIs:**
  * [FFmpeg.wasm v0.11.6](https://github.com/ffmpegwasm/ffmpeg.wasm): In-browser audio & video processing
  * [jsPDF v2.5.1](https://github.com/parallax/jsPDF): Client-side PDF generation
  * HTML5 Canvas API: Pixel grid rendering and client-side image translation
  * Inter Google Font: Modern, clean typography

---

## How to Run Locally

Since this project relies on JavaScript and WebAssembly, it should be operated on a local HTTP web server rather than opening the `.html` file directly.

### Primary Method: VS Code Live Server
1. Open the repository folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click on `index.html` and select **Open with Live Server**.
4. The site will launch at `http://127.0.0.1:5500`.

### Alternative Method: Node.js http-server
1. Open a terminal in the root directory of the project.
2. Run the following command:
   ```bash
   npx http-server -p 8080
