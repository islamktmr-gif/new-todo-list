const Input = document.querySelector("#txtTaskName");
const addBtn = document.querySelector("#btnAddNewTask");
const TodoList = document.querySelector("#todolist");


let todos = [];

runEvents();

function runEvents() {
    document.addEventListener("DOMContentLoaded", loadStorage);
    addBtn.addEventListener("click", addTask);
}

function addTask(e) {
    e.preventDefault();

    const text = Input.value.trim();
    if (text === "") {
        alert("Lütfen bir görev giriniz!");
        return;
    }

    todos.push(text);    
    addtodoUI(text);      
    saveStorage();       

    Input.value = "";    
    Input.focus();
}

function loadStorage() {
    const storageTodos = localStorage.getItem("todos");

    if (storageTodos !== null) {
        todos = JSON.parse(storageTodos);
        todos.forEach(function(todo) {
            addtodoUI(todo); 
        });
    }
}

function saveStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(li, text) {
    li.remove();
    const index = todos.indexOf(text);
    if (index > -1) {
        todos.splice(index, 1);
    }
    saveStorage();
}


function addtodoUI(text) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center"; 
    
    const taskText = document.createElement("span");
    taskText.textContent = text;

    const dltBtn = document.createElement("button");
    dltBtn.textContent = "sil";
    dltBtn.className = "btn btn-danger btn-sm";

    dltBtn.addEventListener("click", function() {
        removeTodo(li, text);
    });

    li.appendChild(taskText);
    li.appendChild(dltBtn);
    TodoList.appendChild(li); 
}

// function dikdortgen(kisakenar,uzunkenar){
//     // let sonuc= kisakenar*uzunkenar;
//     // return sonuc;
//     console.log((kisakenar)*(uzunkenar));
// }
// dikdortgen(5,10);