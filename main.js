//유저가 할일을 입력한다
//+버튼 클릭 or 엔터키를 누르면 task줄에 추가된다 
//입력값이 줄마다 추가된다
//체크버튼을 누르면 밑줄이가고 할일이 끝난다
//delete버튼을 누르면 삭제된다
//모두, 진행중, 완료 탭 누르면 언더바가 이동한다
//진행중에는 할일 리스트, 완료에는 완료된 리스트

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let tabFirst = document.getElementById("all");
let mode = "all";

let taskList = [];
let filterList = [];
let list = [];

//날짜 데이터 추가
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = today.getDate();
let currentDate = `${year}.${month}.${day}`;

underLine.style.left = tabFirst.offsetLeft + "px";
underLine.style.width = tabFirst.offsetWidth + "px";

//미입력 알럿
addButton.addEventListener("click", function () {
  if (taskInput.value == "") {
    alert("할 일을 입력해 주세요!");
    return;
  }
  addTask();
});
taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

//엔터 버튼으로 추가
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (taskInput.value.trim() !== "") {
      addTask();
    }
    taskInput.value = "";
  }
});

//밑줄 이동
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    mode = event.target.id;
    render();
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    date: currentDate,
    isComplete: false,
  };

  taskList.push(task);
  render();
}

// ui
function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = taskList.filter((task) => task.isComplete === false);
  } else if (mode === "done") {
    list = taskList.filter((task) => task.isComplete === true);
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    resultHTML += `<div class="task  ${
      list[i].isComplete == true ? `task-done` : ``
    }">
                            <div class="check-button">
                                <button onClick = "toggleComplete('${
                                  list[i].id
                                }')"></button>
                            </div>
                            <div class="task-contain">
                                <div class="task-memo">
                                    ${list[i].taskContent}
                                    <span>${currentDate}</span>    
                                </div>
                                <div class="delete-button"> 
                                    <button onClick = "deleteTask('${
                                      list[i].id
                                    }')"></button>
                                </div>
                            </div>
                        </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

//삭제경고 알럿
function deleteTask(id) {
  if (confirm("정말 삭제 하시겠습니까?")) {
    taskList = taskList.filter((item) => item.id != id);
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
