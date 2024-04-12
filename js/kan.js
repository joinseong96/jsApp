const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

TODOS_KEY = "todos";
let toDos = [];

function saveToDos(){
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
	// 배열로 꺼내쓰기 위해서 JSON.stringify를 사용해 텍스트로 저정함
}


function deleteToDo(event){
	const li = event.target.parentElement;
	//console.log(event.target); // <button>❌</button>가 출력됨
	// event.target는 button이 되고, event.target.parentElement는 li가 되는 것임

	//console.log(li.id);
	
	toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // toDo는 item이다.
	li.remove();
	saveToDos();
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
	const span = li.querySelector("span"); // <span> 요소 찾기

	toDos.forEach((toDo) => {
		if(toDo.id === parseInt(li.id)){
			toDo.check = !toDo.check; // 기존 값을 반전시킴
			
			if(toDo.check) span.style.textDecoration = "line-through";
			else span.style.textDecoration = "none"; // 스트라이크 스타일 제거
		}
	});
	saveToDos();
};

function paintToDo(newToDo){
	const li = document.createElement("li");
	li.id = newToDo.id;

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";


	const span = document.createElement("span");
	const button = document.createElement("button");
	button.className = "delete-btn";

	button.innerText = "❌";
	span.innerText = newToDo.text;

	if(newToDo.check){
		checkbox.checked = true;
		span.style.textDecoration = "line-through"; // 스트라이크 스타일 적용
	}

	button.addEventListener("click", deleteToDo);
	checkbox.addEventListener("click", checkToDo);

	li.appendChild(checkbox);
	li.appendChild(span);
	li.appendChild(button);

	toDoList.appendChild(li);	
}

function handleToDoSubmit(event){
		event.preventDefault();
		const newToDo = toDoInput.value;

		toDoInput.value = "";
		const newToDoObj = {
			text: newToDo,
			id: Date.now(),
			check: false
		};

		toDos.push(newToDoObj); // localStorage에 저장하기 위해 배열로 만듦
		// 하지만 localStorage에는 텍스트만 저장 가능함. 그래서 그냥 저장하면 111,222,333 이런식으로 저장됨

		paintToDo(newToDoObj);
		saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
	const parsedToDos = JSON.parse(savedToDos);
	toDos = parsedToDos; // 새로고침후 이전 데이타의 배열을 toDos에 넣어줌
	parsedToDos.forEach(paintToDo);

	//parsedToDos.forEach((item)=>{
	//	paintToDo(item);
	//}
	// 이걸 축약한 것이 윗 코드이다. item이라는 value가 생성이 되어서 그 함수에 전달이 될수 밖에 없기 때문에 생략이 가능한 것이다.

}