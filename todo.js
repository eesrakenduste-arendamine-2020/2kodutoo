function Todo(description, title, dueDate) {
  this.description = description;
  this.title = title;
  this.dueDate = dueDate;
}
  
let todos = new Array();

window.onload = init;
  
function init() {
  let submitButton = document.getElementById("submit");
  submitButton.onclick = getFormData;
  getTodoData();
}

function getTodoData() {
  let request = new XMLHttpRequest();
  request.open("GET", "todo.txt");
  request.onreadystatechange = function() {
    if (this.readyState == this.DONE && this.status == 200) {
      if (this.responseText) {
        parseTodoItems(this.responseText);

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
  



function saveTodoData() {
  let todoJSON = JSON.stringify(todos);
  let request = new XMLHttpRequest();
  let URL = "save.php?data=" + encodeURI(todoJSON);
  request.open("GET", URL);
  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  request.send();
}
  
