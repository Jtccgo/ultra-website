
# The Ultimate Website

Welcome to **The Ultimate Website**, a client-side web application designed to provide integral everyday digital utilities without relying on external cloud servers or paid subscriptions. Built with modern web tools, it runs purely in your browser, ensuring speed, privacy, and offline capability.

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
