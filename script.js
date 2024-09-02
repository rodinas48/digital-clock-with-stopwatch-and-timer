//clock and digital clock info
let hourArrow = document.getElementById("hour");
let minArrow = document.getElementById("min");
let secArrow = document.getElementById("sec");

let digitalHr = document.getElementById("dHour");
let digitalMin = document.getElementById("dMin");
let digitalSec = document.getElementById("dSec");
let pmam = document.querySelector(".pmam");
let otherAmpm = document.querySelector(".otherAmpm");
let digitalClockWrapper = document.querySelector(".digitalClockWrapper");
let goToStopWatchBtn = document.querySelector(".goToStopWatchBtn");
let goToTimerBtn = document.querySelector(".goToTimerBtn");
// stopwatch dom
let stopwatchWrapper = document.querySelector(".stopwatchWrapper");
let stopwatchHr = document.getElementById("StopwatchHr");
let stopwatchMin = document.getElementById("StopwatchMin");
let stopwatchSec = document.getElementById("StopwatchSec");
let stopwatchMilliSec = document.getElementById("StopwatchMilliSec");
let startBtn = document.querySelector(".stopwatchStart");
let stopwatchLap = document.querySelector(".stopwatchLap");
let resetBtn = document.querySelector(".stopwatchReset");
let laps = document.querySelector(".laps");
let backBtn = document.querySelectorAll(".backBtn");

let stopwatchHours = 0;
let stopwatchMins = 0;
let stopwatchSecs = 0;
let stopwatchMilliSecs = 0;
let stopwatchRunning = false;
let stopWatchInterval;
let lap = 0;
let lapsArray = [];
let type = document.querySelector(".type");
// timer dom
let timerWrapper = document.querySelector(".timerWrapper");
let timerHr = document.getElementById("timerHr");
let timerMin = document.getElementById("timerMin");
let timerSec = document.getElementById("timerSec");
let timerMilliSec = document.getElementById("timerMilliSec");
let time = 0;
let timerHours = 0;
let timerMins = 0;
let timerSecs = 0;
let timerMilliSecs = 0;
let timerInterval;
let startBtnTimer = document.querySelector(".timerStart");
let timerStopBtn = document.querySelector(".timerStop");
let timerReset = document.querySelector(".timerReset");
///////////////// clock and digital clock ///////////////
const updateTimeDisplay = (
  hours,
  mins,
  secs,
  millisecs,
  hrEl,
  minEl,
  secEl,
  millisecEl
) => {

  millisecEl.innerText = millisecs < 10 ? `0${millisecs}` : millisecs;
  secEl.innerText = secs < 10 ? `0${secs}` : secs;
  minEl.innerText = mins < 10 ? `0${mins}` : mins;
  hrEl.innerText = hours < 10 ? `0${hours}` : hours;
};
function displayTime() {
  let date = new Date();

  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let ampm = hour >= 12 ? "PM" : "am";
  let otherampm = hour >= 12 ? "am" : "pm";
  // get hours in 12 format;
  hour = hour % 12 || 12;
  // display the hours,min,secs,pm,am
  updateTimeDisplay(
    hour,
    min,
    sec,
    millisec=0,
    digitalHr,
    digitalMin,
    digitalSec,
    digitalMillisec="0"
  );
  pmam.innerText = ampm;
  otherAmpm.innerText = otherampm;
  //calc the arrow rotation deg
  let hourRotation = 30 * hour + min / 2;
  let minRotation = 6 * min;
  let secRotation = 6 * sec;
  //moveing the arrows with css styling
  hourArrow.style.transform = `rotate(${hourRotation}deg)`;
  minArrow.style.transform = `rotate(${minRotation}deg)`;
  secArrow.style.transform = `rotate(${secRotation}deg)`;
}
//invoke the function every sec
setInterval(() => displayTime(), 1000);

///////////////// stopwatch ///////////
function stopwatch() {
  stopwatchMilliSecs++;
  if (stopwatchMilliSecs === 100) {
    stopwatchSecs++;
    stopwatchMilliSecs = 0;
  }
  if (stopwatchSecs === 60) {
    stopwatchMins++;
    stopwatchSecs = 0;
  }
  if (stopwatchMins === 60) {
    stopwatchHours++;
    stopwatchMins = 0;
  }
  updateTimeDisplay(
    stopwatchHours,
    stopwatchMins,
    stopwatchSecs,
    stopwatchMilliSecs,
    stopwatchHr,
    stopwatchMin,
    stopwatchSec,
    stopwatchMilliSec
  );
}
const startStopWatch = () => {
  if (!stopwatchRunning) {
    stopWatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
    startBtn.classList.add("hidden");
    stopwatchLap.classList.remove("hidden");
  }
};

const lapStopWatch = () => {
  lap++;
  lapsArray.unshift(`<div class="lap">
            <p>lap ${lap}</p>
            <p>
            ${stopwatchHours < 10 ? `0${stopwatchHours}` : stopwatchHours}
            :
            ${stopwatchMins < 10 ? `0${stopwatchMins}` : stopwatchMins}
            :
            ${stopwatchSecs < 10 ? `0${stopwatchSecs}` : stopwatchSecs}
            :
            ${
              stopwatchMilliSecs < 10
                ? `0${stopwatchMilliSecs}`
                : stopwatchMilliSecs
            }
            </p>
          </div>`);

  laps.innerHTML = lapsArray.join("");
  laps.firstElementChild.classList.add("active");
};
const resetStopWatch = () => {
  if (stopwatchRunning) {
    clearInterval(stopWatchInterval);
    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMins = 0;
    stopwatchSecs = 0;
    stopwatchMilliSecs = 0;
    stopwatchMilliSec.innerText = "00";
    stopwatchSec.innerText = "00";
    stopwatchMin.innerText = "00";
    stopwatchHr.innerText = "00";
    startBtn.classList.remove("hidden");
    stopwatchLap.classList.add("hidden");
    lapsArray = [];
    lap = 0;
    laps.innerHTML = "";
  }
};
/////////////// timer ////////////////////////
// get time in mins from user and calc the time to set it in timer
const getTimer = () => {
  time = prompt("Enter Time in Minutes :");
  time = time * 60;
  timerHours = Math.floor(time / 3600);
  timerMins = Math.floor((time % 3600) / 60);
  timerSecs = Math.floor(time % 60);
  console.log(timerHours, timerMins, timerSecs);
    updateTimeDisplay(
      timerHours,
      timerMins,
      timerSecs,
      timerMilliSecs,
      timerHr,
      timerMin,
      timerSec,
      timerMilliSec
    );
};
// work repeatedly based on setinterval
const timer = () => {
  // decreasing timer
  timerMilliSecs--;
  if (timerMilliSecs === -1) {
    timerMilliSecs = 99;
    timerSecs--;
  }
  if (timerSecs === -1) {
    timerSecs = 59;
    timerMins--;
  }
  if (timerMins === -1) {
    timerMins = 59;
    timerHours--;
  }
  // if timer reached 0's clear the interval 
  if (
    timerHours === 0 &&
    timerMins === 0 &&
    timerSecs === 0 &&
    timerMilliSecs === 0
  ) {
    stopTimer();
  }
  // set the numbers of timer when enter a mins or set zeros when it ends
    updateTimeDisplay(
      timerHours,
      timerMins,
      timerSecs,
      timerMilliSecs,
      timerHr,
      timerMin,
      timerSec,
      timerMilliSec
    );
};
// start btn
const startTimer = () => {
// check if zeros get time from user 
  if (
    timerHours === 0 &&
    timerMins === 0 &&
    timerSecs === 0 &&
    timerMilliSecs === 0
  ) {
    getTimer();
    // else start the timer 
  } else {
    timerInterval = setInterval(timer, 10);
    startBtnTimer.classList.add("hidden");
    timerStopBtn.classList.remove("hidden");
  }
};
// stop timer btn
const stopTimer = () => {
  clearInterval(timerInterval);
  startBtnTimer.classList.remove("hidden");
  timerStopBtn.classList.add("hidden");
};
// reset timer btn
const resetTimer = () => {
  clearInterval(timerInterval);
  startBtnTimer.classList.remove("hidden");
  timerStopBtn.classList.add("hidden");
  time = 0;
  timerHours = 0;
  timerMins = 0;
  timerSecs = 0;
  timerMilliSecs = 0;
  timerMilliSec.innerText = "00";
  timerSec.innerText = "00";
  timerMin.innerText = "00";
  timerHr.innerText = "00";
};
startBtnTimer.addEventListener("click", startTimer);
timerStopBtn.addEventListener("click", stopTimer);
timerReset.addEventListener("click", resetTimer);

const backToDClock = () => {
  type.innerText = "clock";
  digitalClockWrapper.classList.remove("hidden");
  stopwatchWrapper.classList.add("hidden");
  timerWrapper.classList.add("hidden");
};
const goToStopWatch = () => {
  type.innerText = "stop watch";
  digitalClockWrapper.classList.add("hidden");
  stopwatchWrapper.classList.remove("hidden");
};
const goToTimer = () => {
  type.innerText = "timer";
  digitalClockWrapper.classList.add("hidden");
  timerWrapper.classList.remove("hidden");
};

startBtn.addEventListener("click", startStopWatch);
stopwatchLap.addEventListener("click", lapStopWatch);
resetBtn.addEventListener("click", resetStopWatch);
backBtn.forEach((btn) => {
  btn.addEventListener("click", backToDClock);
});
goToStopWatchBtn.addEventListener("click", goToStopWatch);
goToTimerBtn.addEventListener("click", goToTimer);
