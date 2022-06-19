// start of timer
//start if global variables
var start = document.getElementsByClassName("resume")[0],
  sec = document.getElementsByClassName("seconds")[0],
  min = document.getElementsByClassName("minutes")[0],
  hours = document.getElementsByClassName("hours")[0],
  stopp = document.getElementsByClassName("stop")[0],
  reset = document.getElementsByClassName("reset")[0],
  inputs = document.querySelectorAll(".startCount"),
  sound = new Audio("sound.mp3"),
  myTimer;

// start the startCount function => click the Enter button
inputs.forEach(input => {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      startCount();
    }
  });
});

// start the startCount function => click the start button
start.addEventListener("click", startCount); // the end of onclick on start button

// startCount When Click Start Or Enter
function startCount() {
  if (start.classList.contains("disabled")) {
    // disable start button if had class disabled
    return false;
  } else if ((sec.value == 0) & (min.value == 0) & (hours.value == 0)) {
    // disable start button if all timers = 0
    return false;
  } else {
    //local variables
    myTimer = setInterval(myFu, 1000);

    // add disables class to start button after clicking on it
    start.classList.add("disabled");
    stopp.classList.remove("disabled");

    // diable adjustment the timers during the time is running
    hours.setAttribute("readonly", "");
    min.setAttribute("readonly", "");
    sec.setAttribute("readonly", "");

    // put double zero if the timer = 0
    if (sec.value == 0) {
      sec.value = "00";
    }
    if (min.value == 0) {
      min.value = "00";
    }
    if (hours.value == 0) {
      hours.value = "00";
    }

    function myAlertFunc() {
      alert("time up");
    }

    // the function for minus from zero timer & minutes timer
    function myFu() {
      sound.play();
      sound.addEventListener("ended", function () {
        sound.play();
      });
      if (sec.value == 0 && min.value == 0 && hours.value == 0) {
        resetValus();
        myAlertFunc();
      } else if (sec.value == 0 && min.value == 0) {
        hours.value = hours.value - 1;
        min.value = 59;
        sec.value = 59;
        if (hours.value <= 9) {
          hours.value = 0 + hours.value;
        }
      } else if (sec.value == 0) {
        min.value = min.value - 1;
        sec.value = 59;
        if (min.value <= 9) {
          min.value = 0 + min.value;
        }
      } else {
        sec.value = sec.value - 1;
        if (sec.value <= 9) {
          sec.value = 0 + sec.value;
        }
      }
    } // this bracket for count down time function

    // stop button
    stopp.addEventListener("click", function () {
      sound.pause();
      clearInterval(myTimer);
      start.classList.remove("disabled");
      hours.removeAttribute("readonly", "");
      min.removeAttribute("readonly", "");
      sec.removeAttribute("readonly", "");
      stopp.classList.add("disabled");
    });

    // start of putting 0 before numbers > 9
    if (hours.value <= 9 && hours.value.indexOf(0) == -1) {
      hours.value = 0 + hours.value;
    }

    if (min.value <= 9 && min.value.indexOf(0) == -1) {
      min.value = 0 + min.value;
    }

    if (sec.value <= 9 && sec.value.indexOf(0) == -1) {
      sec.value = 0 + sec.value;
    }
  }
}

// reset the values when click reset button
reset.addEventListener("click", function () {
  resetValus();
});

// reset the values when click R || r button
document.addEventListener("keypress", function (e) {
  if (e.keyCode === 82 || e.keyCode === 114) {
    resetValus();
  }
});

function resetValus() {
  sound.pause();
  clearInterval(myTimer); // stop the setinterval if all timer = 0
  start.classList.remove("disabled"); // remove disable from start button if all timer = 0
  hours.removeAttribute("readonly", ""); // remove read only ATTR if all timer = 0
  min.removeAttribute("readonly", "");
  sec.removeAttribute("readonly", "");
  sec.value = "";
  min.value = "";
  hours.value = "";
  stopp.classList.add("disabled");
}

/*
 * Don't write more than two numbers in input
 * move to the next input when write to numbers
 */
function limit(e) {
  if (e.value.length > e.maxLength - 1) {
    let num = e.id; // get the element id
    num != 3 ? inputs[num++].focus() : ""; // move to the next element
    return (e.value = e.value.slice(0, e.maxLength)); // stop write more than two numbers
  }
}
