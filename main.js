// TODO:
// <tr> innterHTML -> template
// save session


let tasks_count = 0
let tasks = []
newTaskButton = document.getElementById('newTaskButton')
newTaskButton.addEventListener("click", newTask)

// Functions

function newTask() {
  // starting id count from 0
  let taskId = tasks_count
  tasks_count += 1

  // add <tr> element to html
  let row = document.getElementById('tasks-table').insertRow()
  row.id = taskId
  row.innerHTML = `
  <td>${tasks_count}</td>
  <td contenteditable="true" class="task-name"></td>
  <td class="time">00:00:00</td>
  <td class="status">paused</td>
  <td align="center">
    <button>
      <img class="icon startButton" src="icons/play-button.svg" />
      <img class="icon pauseButton" src="icons/pause-button.svg" style="display: none">
    </button>
    <button>
      <img class="icon completeButton" src="icons/white-heavy-check-mark.svg">
    </button>
  </td>`

  // add js object
  tasks.push({
    id: taskId,
    name: name,
    startButton: document.getElementById(taskId).getElementsByClassName('startButton')[0],
    pauseButton: document.getElementById(taskId).getElementsByClassName('pauseButton')[0],
    completeButton: document.getElementById(taskId).getElementsByClassName('completeButton')[0],
    elapsedTime: 0,
    startTime: undefined,
    timerInterval: undefined,
    text_field_time: document.getElementById(taskId).getElementsByClassName('time')[0],
    text_field_status: document.getElementById(taskId).getElementsByClassName('status')[0]
  })
  // add listeners  
  tasks[taskId].startButton.onclick = function() {start(tasks[taskId])} ; 
  tasks[taskId].pauseButton.onclick = function() {pause(tasks[taskId])} ;
  tasks[taskId].completeButton.onclick = function() {complete(tasks[taskId])} ;
}

function timeToString(time) {
  let deltaHrs = time / 3600000;
  let hh = Math.floor(deltaHrs).toString().padStart(2, "0");

  let deltaMin = (deltaHrs - hh) * 60;
  let mm = Math.floor(deltaMin).toString().padStart(2, "0");

  let deltaSec = (deltaMin - mm) * 60;
  let ss = Math.floor(deltaSec).toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}

function showButton(obj, buttonKey) {
  const buttonToShow = buttonKey === "START" ? obj.startButton : obj.pauseButton;
  const buttonToHide = buttonKey === "START" ? obj.pauseButton : obj.startButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}

function start(obj) {
  obj.startTime = Date.now() - obj.elapsedTime; // start from where pause left off
  obj.timerInterval = setInterval(function setTime() {
    obj.elapsedTime = Date.now() - obj.startTime;
    obj.text_field_time.innerHTML =  timeToString(obj.elapsedTime);
    obj.text_field_status.innerHTML =  "active";
  }, 10); // update every 10ms
  showButton(obj, "PAUSE");
}

function pause(obj) {
  clearInterval(obj.timerInterval);
  obj.text_field_status.innerHTML =  "paused";
  showButton(obj, "START");
}

function complete(obj) {
  clearInterval(obj.timerInterval);
  obj.text_field_time.innerHTML =  "--:--:--";
  obj.text_field_status.innerHTML =  "done!";
  obj.elapsedTime = 0;
  showButton(obj, "START");
}