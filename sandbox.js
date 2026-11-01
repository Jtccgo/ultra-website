const downloadBtn = document.getElementById('download-btn');
const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById("color-picker");
const clearBtn = document.getElementById("clear-btn");
const toolBtns = document.querySelectorAll(".tool-btn");
const resolution = document.getElementsById("resolution")
document.addEventListener("DOMContentLoaded", () => {

    const GRID_SIZE = parseFloat(resolution.value);/*Nice bold constant used to represent the canvas "pixels" as a square should be modifiable to change the resolution*/
    let currentTool = "draw";
    let isDrawing = false; 
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,GRID_SIZE, GRID_SIZE);

    toolBtns.forEach(btn => {//adds this event listener to all elements that have this class
        btn.addEventListener("click", () => {
            toolBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentTool = btn.dataset.tool;//sets the tool
        });
    });

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();//describes size and position relatve to screen size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;//proportion
        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);
        return {x, y};
    }

    function draw(e) {
        if(!isDrawing) return;
        const {x, y} = getCoords(e);

        if(x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
            if(currentTool === "draw") {//Eventually have to make it so that erasing does a blank square like with no bg instead of just white 
                ctx.fillStyle = colorPicker.value;
                ctx.fillRect(x, y, 1, 1);
                canvas.style.cursor = "url('sprites/pencil.png') 50 50, crosshair";
            } else if(currentTool === "erase") {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(x, y, 1, 1)
                canvas.style.cursor = "url('sprites/eraser.png') 32 32, crosshair";
            }
        }
    }

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        draw(e);
    });
    
    canvas.addEventListener("mousemove", draw);//makes it so that draggin WHILST having the mousedown plots color
    document.addEventListener("mouseup", () => isDrawing = false);

    clearBtn.addEventListener("click", () => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0, GRID_SIZE, GRID_SIZE)
    });
});
resolution.addEventListener
downloadBtn.addEventListener("click", (event) => {
    const dataUrl = canvas.toDataURL("image/png", 1.0);

    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'pixelArt.png';
    downloadLink.click();
});