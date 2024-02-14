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
textInput.addEventListener("focus",function() {textInput.value=""})


function addTask() {
  // let taskContent = textInput.value;
  let task = {
    id: randomIdGenerate(),
    taskContent: textInput.value,
    isComplete:false
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if(taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div>
       <button onclick="toggleComplete('${taskList[i].id}')" class="check-btn">check</button>
       <button onclick="deleteTask('${taskList[i].id}')" class="delete-btn">delete</button>
        </div>
    </div>
        `
    } else {
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div>
     <button onclick="toggleComplete('${taskList[i].id}')" class="check-btn">check</button>
     <button onclick="deleteTask('${taskList[i].id}')" class="delete-btn">delete</button>
      </div>
  </div>
      `
    }
  }
  let taskBoard = (document.getElementById("task-board").innerHTML = resultHTML);
}

function toggleComplete(id){
 console.log(id)
 for(let i = 0; i < taskList.length; i++){
     if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete // true만 고정이 아니라, true/false 왔다갔다하게 해주는 !
      break
     }
 }
 render()
 console.log(taskList)
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
   if(taskList[i].id == id){
    taskList.splice(i,1)
    break
   }
  }
  render() 
}

function randomIdGenerate(){
  return Math.random().toString(36).substr(2, 16);
}