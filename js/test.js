const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];
// 이전의것이 초기화되고 새로운것으로 덮어씌우지 않기 하기위해 toDos 변수를 업데이트해줄 let으로 변경

function saveToDos(){
    // localStorage.setItem(TODOS_KEY, toDos);
    // JSON.stringify로 todos 배열을 string 으로 바꿔줌
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // 배열로 꺼내쓰기 위해서 JSON.stringify를 사용해 텍스트로 저정함
}

function deleteToDo(event){
    const li = event.target.parentElement;
   	//console.log(event.target); // <button>❌</button>가 출력됨
  	// event.target는 button이 되고, event.target.parentElement는 li가 되는 것임
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    //toDo.id 가 number type 이고 li.id가 string type 이기 때문에 parseInt 함수로 number로 변경
    saveToDos();
    // saveToDos가 호출되면 localstorage에 저장
}

/*
function sexyFilter(item){ return item !== 3 }
[1,2,3,4].filter(sexyFilter); // [1,2,4]
// 이런식으로 filter를 사용할 수 있다. filter는 true인 것만 모아서 새로운 배열을 만들어준다.

const arr = [1,2,3,4];
arr.filter((item) => item > 2); // [3,4]
*/

function checkToDo(event){
  const li = event.target.parentElement;
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDos();
}


function paintToDo(newTodoTxt){
    const list = document.createElement("li");
    list.id = newTodoTxt.id;
    const button = document.createElement("button");
    const chkBox = document.createElement("input");
    chkBox.setAttribute("type", "checkbox");

    button.innerText = "X";
    button.addEventListener("click", deleteToDo);
    chkBox.addEventListener("click", checkToDo);

    const span = document.createElement("span");
    span.innerText = newTodoTxt.text;

    list.appendChild(button);
    list.appendChild(chkBox);
    list.appendChild(span);
    toDoList.appendChild(list);

    chkBox.addEventListener('change', function() {
      if (this.checked) {
        span.classList.add("active");
      } else {
        span.classList.remove("active");
      }
    });
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(){
    console.log("hello");
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    // localstorage에 item이 있으면 전에 저장되어있던 배열 복원
    parsedToDos.forEach(paintToDo);
}
// localstorage에 string이 존재할때 parse를 통해 존재하는 string을 배열로 전환한다

// const arr = [{text:"lalala"}, {text:"lololo"}]

// function sexyFilter(todo){
//   return todo.text !== "lololo"
// }
// arr.filter(sexyFilter)

// arr.filter(todo => todo !== "lololo")
// 위아래 동일한 함수