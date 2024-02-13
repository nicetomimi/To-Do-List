//유저가 할일을 입력한다
//+버튼 클릭 or 엔터키를 누르면 task줄에 추가된다 
//입력값이 줄마다 추가된다
//체크버튼을 누르면 밑줄이가고 할일이 끝난다
//delete버튼을 누르면 삭제된다
//모두, 진행중, 완료 탭 누르면 언더바가 이동한다
//진행중에는 할일 리스트, 완료에는 완료된 리스트

let textInput = document.getElementById("text-input");
let addButton = document.getElementById("add-btn");
addButton.addEventListener("click", addTask);
let taskList = [];

function addTask() {
  let taskContent = textInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
       <button class="check-btn">check</button>
       <button class="delete-btn">delete</button>
        </div>
    </div>
        `;
  }
  let taskBoard = (document.getElementById("task-board").innerHTML = resultHTML);
}
