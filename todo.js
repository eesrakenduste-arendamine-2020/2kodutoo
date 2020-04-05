function Todo(description, title, dueDate) {
  this.description = description;
  this.title = title;
  this.dueDate = dueDate;
  this.deleted = null;
  this.done = "undone";
}
  
let todos = new Array();
let localTodo = localStorage.getItem("todo");
let doneS = 0;

window.onload = init;
  
function init() {
  let submitButton = document.getElementById("submit");
  submitButton.onclick = getFormData;
  getTodoData();
}


function saveLocal (){
  localStorage.setItem('here are your events', JSON.stringify(todos));
}


function getTodoData() {
  let request = new XMLHttpRequest();
  request.open("GET", "todo.txt");
  request.onreadystatechange = function() {
    if (this.readyState == this.DONE && this.status == 200) {
      if (this.responseText) {
        parseTodoItems(this.responseText);
        addTodosToPage();
      } else {
        console.log("Error no data");
      }
    }
  };
  request.send();
}



function parseTodoItems(todoJSON) {
  if (todoJSON == null || todoJSON.trim() == "") {
    return;
  }
  let todoArray = JSON.parse(todoJSON);
  if (todoArray.length == 0) {
    console.log("Error todo list array is empty!");
    return;
  }
  for (let i = 0; i < todoArray.length; i++) {
    let todoItem = todoArray[i];
    todos.push(todoItem);
  }
}
  


function addTodosToPage() {
  let ul = document.getElementById("todoList");
  document.forms[0].reset();  
  for (let i = 0; i < todos.length; i++) {
    let todoItem = todos[i];
    let li = document.createElement("li");
    let a = document.createElement("a");
    if (todoItem.deleted == null) {
      
      a.innerHTML = todoItem.title + "  " + todoItem.description + " by " + todoItem.dueDate;
      const removeButton = document.createElement("div");
      removeButton.className = "delete-button";
      const removeIcon = document.createTextNode("X");
      removeButton.addEventListener("click", () => {
        ul.removeChild(li);
        todoItem.deleted = "yes";
        saveTodoData();
      });
      const doneButton = document.createElement("div");
      doneButton.innerHTML = "Mark Done";
      doneButton.className = "done-button";
      if (todoItem.done == "undone") {
        doneButton.innerHTML = "Mark Done";
        doneButton.addEventListener("click", () => {
          console.log(todoItem.done);
          doneButton.innerHTML = "Mark Undone";
          todoItem.done = "done";
          saveTodoData();
        });
      } else if (todoItem.done == "done") {
        doneButton.innerHTML = "Mark Undone";
        doneButton.addEventListener("click", () => {
          console.log(todoItem.done);
          doneButton.innerHTML = "Mark Done";
          todoItem.done = "undone";
          saveTodoData();
        });
      }
      li.appendChild(a);
      li.appendChild(doneButton);
      removeButton.appendChild(removeIcon);
      li.appendChild(removeButton);
      if(todoItem.done == "done" && doneS == 2){
        ul.appendChild(li);
      } else if(doneS == 0){
        ul.appendChild(li);
      } else if(doneS == 1 && todoItem.done == "undone"){
        ul.appendChild(li);
      }
    }
  }
}


function getFormData() {
  let description = document.getElementById("description").value;
  if (checkInputText(description, "Please enter a description")) return;

  let title = document.getElementById("title").value;
  if (checkInputText(title, "Please enter a title")) return;

  let date = document.getElementById("dueDate").value;
  if (checkInputText(date, "Please enter a due date")) return;

  console.log("New description " + description + ", for: " + title + ", by: " + date);
  let todoItem = new Todo(description, title, date);
  todos.push(todoItem);
  saveTodoData();
  saveLocal(todoItem);
  document.getElementById("todoList").innerHTML = "";
  addTodosToPage();
}

function checkInputText(value, msg) {
  if (value == null || value == "") {
    alert(msg);
    return true;
  }
  return false;
}

function saveTodoData() {
  let todoJSON = JSON.stringify(todos);
  let request = new XMLHttpRequest();
  let URL = "save.php?data=" + encodeURI(todoJSON);
  request.open("GET", URL);
  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  request.send();
}
  
function sortDone(){
  let checkbox1 = document.getElementById("doneCheck");
  let checkbox2 = document.getElementById("notdoneCheck");
  if (checkbox1.checked == true && checkbox2.checked == true){
    doneS = 0;
  } else if(checkbox1.checked == true && checkbox2.checked == false) {
    doneS = 2;
  }else if(checkbox1.checked == false && checkbox2.checked == true) {
    doneS = 1;
  }else{
    doneS = 3;
  }
  document.getElementById("todoList").innerHTML = "";
  addTodosToPage();
}