//유저가 할일을 입력한다
//+버튼 클릭 or 엔터키를 누르면 task줄에 추가된다 
//입력값이 줄마다 추가된다
//체크버튼을 누르면 밑줄이가고 할일이 끝난다
//delete버튼을 누르면 삭제된다
//모두, 진행중, 완료 탭 누르면 언더바가 이동한다
//진행중에는 할일 리스트, 완료에는 완료된 리스트

let textInput = document.getElementById("text-input")
let addButton = document.getElementById("add-btn")
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div") //여러개 한번에 가져올 때
let mode = 'all'
let taskList = []
let filterList = []
let list = []

addButton.addEventListener("click", addTask)
textInput.addEventListener("focus",function() {textInput.value=""})


//탭 선택
for (let i = 1; i < tabs.length; i++) { //under-line이 index 0이므로 1부터 시작
  tabs[i].addEventListener("click", function(event){filter(event)})
}
console.log(tabs)


//언더라인 이동
for (let i=1; i<tabs.length; i++){
  tabs[i].addEventListener("click", function(event){
      underLine.style.left=event.currentTarget.offsetLeft + "px"
      underLine.style.width=event.currentTarget.offsetWidth + "px"
      mode = event.target.id;
      render();
  })
}


function addTask() {
  // let taskContent = textInput.value;
  let task = {
    id: randomIdGenerate(),
    taskContent: textInput.value,
    isComplete:false
  }
  taskList.push(task)
  console.log(taskList)
  render();
}

function render() {
  let list = []
  if (mode === "all"){
     list = taskList
  } else if (mode === "ongoing"){
     list = filterList
  } else if (mode === "done"){
    list = filterList
  }
  

  let resultHTML = ""
  for (let i = 0; i < list.length; i++) {
    if(list[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
       <button onclick="toggleComplete('${list[i].id}')" type="button" class="check-btn btn btn-dark"><i class="fa-solid fa-rotate-left" style="color: #ffffff;"></i></button>
       <button onclick="deleteTask('${list[i].id}')" type="button" class="delete-btn btn btn-danger"><i class="fa-solid fa-trash" style="color: #ffffff;"></i></button>
        </div>
    </div>
        `
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
     <button onclick="toggleComplete('${list[i].id}')" type="button" class="check-btn btn btn-success"><i class="fa-solid fa-check" style="color: #ffffff;"></i></button>
     <button onclick="deleteTask('${list[i].id}')" type="button" class="delete-btn btn btn-danger"><i class="fa-solid fa-trash" style="color: #ffffff;"></i></button>
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

function filter(event) {
  console.log("filter")
  mode = event.target.id
  filterList = []
 if (mode === "all"){
  render() 
 }
 else if (mode === "ongoing"){
  for(let i=0;i<taskList.length;i++){ 
    if(taskList[i].isComplete === false) {
      filterList.push(taskList[i])
    }
  } 
  render() 
 }else if (mode === "done"){
  for(let i=0;i<taskList.length;i++){ 
    if(taskList[i].isComplete === true) {
      filterList.push(taskList[i])
    }
  } 
  render() 
}
}

//삭제 확인 메세지
function deleteTask(id){
  if(confirm("정말 삭제 하시겠습니까?")){
      taskList = taskList.filter(item => item.id != id);
  }
  render();
}

//id생성
function randomIdGenerate(){
  return Math.random().toString(36).substr(2, 16) 
}