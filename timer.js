document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll("#sandbox-toolbar .tool-btn");
    const panels = document.querySelectorAll(".time-panel");

    tabBtns.forEach(btn => {//for each button an evnetListener is added and when a panel is clicked a button's panels either get removed or added pretty neat and concise
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const target = btn.dataset.tab;/*Documentation says that this should work but it didn't auto pop up in selection*/ 
            panels.forEach(panel => {
                panel.classList.add("hidden");
                if (panel.id === `${target}-section`) {
                    panel.classList.remove("hidden");
                }
            });
        });
    });

    //logic for the clock
    const clockDisplay = document.getElementById("clock-display");
    function updateClock() {
        const now = new Date();
        clockDisplay.textContent = now.toLocaleTimeString();//takes the current time of your locaility
    }
    setInterval(updateClock, 1000);
    updateClock();

    //logic for the stopwatch
    const swDisplay = document.getElementById("stopwatch-display");
    const swStart = document.getElementById("sw-start-btn");
    const swPause = document.getElementById("sw-pause-btn");
    const swReset = document.getElementById("sw-reset-btn");

    let swSeconds = 0;
    let swInterval = null;

    function formatTime(totalSeconds) {
        const hrs = Math.floor(totalSeconds/3600).toString().padStart(2, '0');//pads the time
        const mins = Math.floor((totalSeconds % 3600)/60).toString().padStart(2, '0');
        const secs = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }//simple calculations to get a readable time

    swStart.addEventListener("click", () => {//when stopwatch "start" is clicked the time starts counting
        if(swInterval) return;
        swInterval = setInterval(() => {
            swSeconds++;
            swDisplay.textContent = formatTime(swSeconds);
        }, 1000);
    });
    
    swPause.addEventListener('click', () => {//when pause is licked the interval is interrupted
        clearInterval(swInterval);
        swInterval = null;
    });

    swReset.addEventListener('click', () => {//when reset is pressed seconds restart and the interval is interrupted
        clearInterval(swInterval);
        swInterval = null;
        swSeconds = 0;
    });

    //logic for countdown
    const tDisplay = document.getElementById("timer-display");
    const minInput = document.getElementById("timer-minutes");
    const secInput = document.getElementById('timer-seconds');
    const tStart = document.getElementById('t-start-btn');
    const tPause = document.getElementById('t-pause-btn');
    const tReset = document.getElementById('t-reset-btn');

    let totalTimerSeconds = 0;
    let tInterval = null;

    function updateTimerDisplay() {
        const mins = Math.floor(totalTimerSeconds/60).toString().padStart(2, '0');
        const secs = (totalTimerSeconds % 60).toString().padStart(2, '0');
        tDisplay.textContent = `${mins}:${secs}`;
    }

    tStart.addEventListener('click', () => {
        if(tInterval) return;

        if(totalTimerSeconds === 0) {
            const m = parseInt(minInput.value) || 0;
            const s = parseInt(secInput.value) || 0;
            totalTimerSeconds = (m*60) + s;
        }

        if(totalTimerSeconds <= 0 ) return;

        tInterval = setInterval(() => {//for every 1000ms or second the timer ticks down the display is updated otherwise if it cant be decreased it stops and alerts the user
            if (totalTimerSeconds > 0) {
                totalTimerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(tInterval);
                tInterval = null;
                alert("Time's up!");
                //play a sound?
                //should make the timer appear on the title of the page when started
            }
        }, 1000);
    });

    tPause.addEventListener("click", () => {
        clearInterval(tInterval);
        tInterval = null;
        const m = parseInt(minInput.value) || 0;
        const s = parseInt(secInput.value) || 0;
        totalTimerSeconds = (m * 60) + s;
        updateTimerDisplay();
    });//sets temporary display to freeze and stops the interval

    updateTimerDisplay();
    //METRONOME TERRITORY 
    const bpmDisplay = document.getElementById("metronome-bpm-display");
    const bpmSlider = document.getElementById("bpm-slider");
    const bpmNumber = document.getElementById("bpm-number");
    const metroStart = document.getElementById("metro-start-btn");
    const metroStop = document.getElementById("metro-stop-btn")
    let bpm = 120;
    let metroInterval = null;
    let audioContext = null;
    //Eventually I want to include custom sounds and stuff 
    function playClick() {//uses the webAudio API
        if(!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();//good practice because it covers modern and older browsers
        } if (audioContext.state === "suspended") {audioContext.resume();}//make sure that it's going 
        const osc = audioContext.createOscillator();//
        const gain = audioContext.createGain();

        osc.type = 'sine';//Oscillator is literally just like trigonmetric functions 
        osc.frequency.setValueAtTime(1000, audioContext.currentTime);//frequency Hz higher = more sharper

        gain.gain.setValueAtTime(1, audioContext.currentTime);//gain is like the amplitude so this is basically volume
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);//relatively short

        osc.connect(gain);//this stuff brings it all together into what I want
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 0.05);
    }

    function updateBpm(newBpm) {
        bpm = Math.min(Math.max(newBpm, 40), 240);//Its limited liked this because its what humans naturally relate and connect to; anything above or below the limit is too fast that it sounds continuous or too slow that the beats don't even seem successive
        bpmDisplay.textContent = `${bpm} BPM`;
        bpmSlider.value = bpm;
        bpmNumber.value = bpm;
        if(metroInterval) {
            stopMetronome();
            startMetronome();
        }
    }

    function startMetronome() {
        if(metroInterval) return;
        //playClick(); dont want this because when scrolling the slider it makes a lot of noise 
        const intervalMs = (60/bpm) * 1000;
        metroInterval = setInterval(playClick, intervalMs);
    }
    function stopMetronome() {
        clearInterval(metroInterval);
        metroInterval = null;
    }

    bpmSlider.addEventListener("input", (e) =>  updateBpm(parseInt(e.target.value)));//so elegant (*ˊᗜˋ*)
    bpmNumber.addEventListener("change", (e) => updateBpm(parseInt(e.target.value) || 120));

    metroStart.addEventListener("click", startMetronome);
    metroStop.addEventListener("click", stopMetronome);
}); 