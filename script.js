const form = document.getElementById("conversion-form");
const selectType = document.getElementById('file-type');
const initialFormat = document.getElementById('initial-format');
const requestedFormat = document.getElementById("requested-format");
const fileUpload = document.getElementById('file-btn');
const sumbit = document.getElementById('sumbit');
const quality = document.getElementById('quality-slider');
const sliderValue = document.getElementById('slider-value');
const successMessage = document.getElementById('result-message');
//to let the user know that their stuff has been submitted
const imageFormats = [new Option("PNG", "png"), new Option("JPEG", "jpeg"),
    new Option ("JPG", "jpg"), new Option("WEBP", "webp"), new Option("AVIF", "avif"), 
    new Option("BMP", "bmp")
];
const audioFormats = [new Option("MP3", "mp3"), new Option("AAC", "aac"),
    new Option("WAV", "wav"), new Option("AIFF", "aiff"), new Option("ALAC", "alac"),
    new Option("FLAC", "flac"), new Option("OGG", "ogg"), new Option("OPUS", "opus")
];
const documentFormats = [new Option("DOCX", "docx"), new Option("ODT", "odt"),
    new Option("PDF", "pdf"), new Option("EPUB", "epub"), new Option("TXT", "txt"),
    new Option("MD", "md"), new Option("HTML", "html")
];
const videoFormats = [new Option("MP4", "mp4"), new Option("MOV", "mov"),
    new Option("MKV", "mkv"), new Option("WebM", "webm"), new Option("AVI", "avi"),
    new Option("WMV", "wmv"), 
];
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(selectType.value === "none" || requestedFormat.value === "none" || fileUpload.files.length == 0) {
        alert("One or more of the inputs is null. Please try again.");
    } else {
        ImageEngine.convert(fileUpload.files[0], {format: "jpg", quality: 0.5});
    }
});
quality.oninput = function() {
    sliderValue.textContent = this.value;
}
selectType.addEventListener('change', function() {
    requestedFormat.length = 0;
    switch(selectType.value) {

        case "audio":
            audioFormats.forEach((imageType) => requestedFormat.add(imageType));
            break;
        case "video":
            videoFormats.forEach((imageType) => requestedFormat.add(imageType));
            break;
        case "images":
            imageFormats.forEach((imageType) => requestedFormat.add(imageType));
            break;
        case "documents":
            documentFormats.forEach((imageType) => requestedFormat.add(imageType));
            break; 
        default: 
            requestedFormat.add(new Option("----", "none"));
            break;     
    }
});

const ImageEngine = {
    convert(file, options) {
        console.log("Converting image using HTML canvas");
        const resultingMimeType = `image/${options.format}`;//Piece of jargon that communicates to the computer what format of image it wants

        const reader = new FileReader();

        reader.onload = function(event) {//onload means the file reader has finished
            const img = new Image();
            //creates a canvas according to the width and height of the one given
            img.onload = function() {
                canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);//plots at top left where the origin is
                const dataURL = canvas.toDataURL(resultingMimeType, options.quality)//converts the canvas to the specified format and quality

                const downloadLink = document.createElement('a');
                downloadLink.href = dataURL;
                downloadLink.download = `converted-file${options.format}`;
                downloadLink.click();
            };
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
}

const VideoEngine = {

}






/*
have to add an event listner so that when the user
to press submit they get an rejection message 
that notifies them that they have to pick the options if  
the deseelcted one or haven't uploaded a file
also this stuff that I'm doing is kindf of a bit too sequential
so I need to fix it by making the steps perhaps all be there already
and just do a simple if statement regarding the options before the sumbit button

*/
