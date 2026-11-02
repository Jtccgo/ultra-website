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
}); 