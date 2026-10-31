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
    new Option ("JPG", "jpg"), new Option("WEBP", "webp"), /*new Option("AVIF", "avif"),*/ 
    /*new Option("BMP", "bmp")*/
];
//Avif and BMP are not currently supported
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

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if(selectType.value === "none" || requestedFormat.value === "none" || fileUpload.files.length == 0) {
        alert("One or more of the inputs is null. Please try again.");
    } else {
        const engine = ConversionFactory.getEngine(selectType.value);
        const numQuality = parseFloat(quality.value);
        successMessage.textContent = "Processing file conversion, please wait...";
        
        await engine.convert(fileUpload.files[0], {
            format: requestedFormat.value, 
            quality: numQuality
        });
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
            quality.classList.add('hidden');
            break;
        case "video":
            videoFormats.forEach((imageType) => requestedFormat.add(imageType));
            quality.classList.add('hidden');
            break;
        case "image":
            imageFormats.forEach((imageType) => requestedFormat.add(imageType));
            quality.classList.remove('hidden');
            break;
        case "document":
            documentFormats.forEach((imageType) => requestedFormat.add(imageType));
            quality.classList.add('hidden');
            break; 
        default: 
            requestedFormat.add(new Option("----", "none"));
            quality.classList.add('hidden');
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
                downloadLink.download = `converted-file.${options.format}`;
                downloadLink.click();
            };
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
}

const VideoEngine = {
    async convert(file, options) {
        try {
            await runFFmpegTranscode(file, options.format);
        } catch(error) {
            console.error("Video conversion failed:", error);
            alert("Video transcoding failed");
        }
    }
};

const AudioEngine = {
    async convert(file, options) {
        try {//runs the
            await runFFmpegTranscode(file, options.format); 
        } catch(error) {
            console.error("Audio conversion failed:", error);
            alert("Audio transcoding failed.");
        }
    }
};

const DocumentEngine = {
    convert(file, options) {
        console.log("Document engine starting...");
        const reader = new FileReader();

        reader.onload = function(event) {
            //this applies to .pdf
            const fileText = event.target.result;
            if(options.format === 'pdf') {
                const {jsPDF} = window.jspdf;
                const doc = new jsPDF();

                doc.text(fileText, 10, 10);

                doc.save("converted-file.pdf");
            } else {
                //This applies to .txt .md .html
                const blob = new Blob([fileText], {type: 'text/plain'});
                const dataURL = URL.createObjectURL(blob);

                const downloadLink = document.createElement('a');
                downloadLink.href = dataURL;
                downloadLink.download = `converted-document.${options.format}`;
                downloadLink.click();
                URL.revokeObjectURL(dataURL);
            }
        };
        reader.readAsText(file);
    }
};

const ConversionFactory = {
    getEngine(fileType) {
        switch(fileType) {//Automatically gives the right engine so you don't have to worry about doing the logic yourself
            case 'image': return ImageEngine;
            case 'video': return VideoEngine;
            case 'audio': return AudioEngine;
            case 'document': return DocumentEngine;
            default: throw new Error("Unsupported File Type");
        }
    }
};


//Helper function 
async function runFFmpegTranscode(file, targetFormat) {
    console.log(`Initializing FFmpeg.wasm for ${targetFormat} conversion`);
    //I don't know whats wrong exactly but it seems like its not download the libraries and packages this program needs
    const {FFmpeg} = window.FFmpegWASM;//this kind of syntax is used to destructure functions and classes
    const {fetchFile, toBlobURL} = window.FFmpegUtil;
    const ffmpeg = new FFmpeg();//creates a class of ffmpeg a popular free tool to convert and manipulate audio and video files
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    //WHAT ERROR IS HAPPENING HERE
    // if(!ffmpeg.isLoaded()) {
    //     await ffmpeg.load();
    // }
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'), //<--- look at this comma its crazy its called a trailing comma and its used so it doesn't look like there is two new changes in git when adding another line of parameter
    });//waits for the thread/worker to initalize and load the .wasm or webAssembly
    await ffmpeg.writeFile('input_file', await fetchFile(file));//writes the file to the stream
    await ffmpeg.exec(['-i', 'input_file', `output.${targetFormat}`]);//first two parameters declare the input and the third is the result
    const data = await ffmpeg.readFile(`output.${targetFormat}`);//reads the binary data of the output file so that we can make a download link
    const dataURL = URL.createObjectURL(new Blob([data.buffer], {type: `${selectType.value}/${targetFormat}`}));//makes a temporary web link from the blob that the user downloads

    const downloadLlink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = `converted-file.${targetFormat}`;
    downloadLink.click();
    //downloads the file for the user using a link element
};



/*
have to add an event listner so that when the user
to press submit they get an rejection message 
that notifies them that they have to pick the options if  
the deseelcted one or haven't uploaded a file
also this stuff that I'm doing is kindf of a bit too sequential
so I need to fix it by making the steps perhaps all be there already
and just do a simple if statement regarding the options before the sumbit button

*/
