function Todo(description, title, dueDate) {
  this.description = description;
  this.title = title;
  this.dueDate = dueDate;
}
  
let todos = new Array();
let localTodo = localStorage.getItem("todo");

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
    if (todoItem.deleted == null) {
      
      li.innerHTML = todoItem.title + "  " + todoItem.description + " by " + todoItem.dueDate;
      const removeButton = document.createElement("div");
      removeButton.className = "delete-button";
      const removeIcon = document.createTextNode("X");
      removeButton.addEventListener("click", () => {
        ul.removeChild(li);
        todoItem.deleted = "yes";
        saveTodoData();
      });
      removeButton.appendChild(removeIcon);
      li.appendChild(removeButton);
      ul.appendChild(li);
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
  
