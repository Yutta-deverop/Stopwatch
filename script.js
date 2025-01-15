let startTime;
let elapsedTime = 0;
let timerInterval;
const timeDisplay = document.getElementById("timeDisplay");
const lapTimes = document.getElementById("lapTimes");
const themeSelect = document.getElementById("themeSelect");
const startStopButton = document.getElementById("startStopButton");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function startStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startStopButton.textContent = "スタート";
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
    startStopButton.textContent = "ストップ";
  }
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.000";
  lapTimes.innerHTML = "";
  startStopButton.textContent = "スタート";
}

function recordLap() {
  if (elapsedTime === 0) return;
  const li = document.createElement("li");
  li.className = "lap-item";

  const lapText = document.createElement("span");
  lapText.textContent = formatTime(elapsedTime);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌️";
  deleteButton.className = "delete-lap";
  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(lapText);
  li.appendChild(deleteButton);
  lapTimes.appendChild(li);
}

function changeTheme() {
  document.body.className = themeSelect.value;
}

startStopButton.addEventListener("click", startStop);
document.getElementById("resetButton").addEventListener("click", reset);
document.getElementById("lapButton").addEventListener("click", recordLap);
themeSelect.addEventListener("change", changeTheme);
