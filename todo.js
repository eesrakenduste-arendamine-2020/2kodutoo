function Todo(description, title, dueDate) {
  this.description = description;
  this.title = title;
  this.important = important;
  this.dueDate = dueDate;
  this.deleted = null;
  this.done = "undone";
}
  
let localTodo = localStorage.getItem("todo");
let todos = new Array();
let doneS = 0;

function datefn(){
  let month = ((new Date()).getMonth()+1);
  let date = (new Date()).getDate();
  if(month < 10){
    month = "0" + month;
  }
  if(date < 10){
    date = "0" + date;
  }
  let today = (new Date()).getFullYear() + "-" + month + "-" + date
  return today;
}

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
  let ul1 = document.getElementById("todoListI");
  let c = 0;
  document.forms[0].reset();  
  for (let i = 0; i < todos.length; i++) {
    let todoItem = todos[i];
    let li = document.createElement("li");
    let a = document.createElement("a");
    
    today = datefn();
    //console.log(todoItem.dueDate)
    //console.log(today)
    if(todoItem.dueDate == today){
      li.style.color = "red";
    } else if(todoItem.dueDate < today){
      li.style.color = "yellow";
    }
    if (todoItem.deleted == null) {
      
      a.innerHTML = todoItem.title + "  " + todoItem.description + " by " + todoItem.dueDate;
      const removeButton = document.createElement("div");
      removeButton.className = "delete-button";
      const removeIcon = document.createTextNode("X");
      removeButton.addEventListener("click", () => {
        if(todoItem.important == "Yes"){
          c = ul1;
        }else{
          c = ul;
        }
        $(li).fadeOut(1000);
        setTimeout(function(){
          c.removeChild(li);
        },1000);
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
      
      if(todoItem.important == "Yes"){
        c = ul1;
      }else{
        c = ul;
      }
      if(todoItem.done == "done" && doneS == 2){
        c.appendChild(li);
      } else if(doneS == 0){
        c.appendChild(li);
      } else if(doneS == 1 && todoItem.done == "undone"){
        c.appendChild(li);
      }
      $('#todoList').hide().fadeIn(1200);
      $('#todoListI').hide().fadeIn(1200);
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

  let important = document.getElementById("important").value;
  

  console.log("New description " + description + ", for: " + title + ", by: " + date + ", with important " + important);
  let todoItem = new Todo(description, title, date, important);
  todos.push(todoItem);
  saveTodoData();
  saveLocal(todoItem);
  document.getElementById("todoList").innerHTML = "";
  document.getElementById("todoListI").innerHTML = "";
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
  
function checkedImportant() {
  let checkBox = document.getElementById("important");
  if (checkBox.checked == true) {
    important = "Yes";
    return important;
  } else {
    important = "No";
  }
}
  
function sortAlphabetically() {
  todos.sort(function(a, b){
    if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
    if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
    console.log(todos)
    return 0;
  })
}

function changeSorting() {
  document.getElementById("todoList").innerHTML = "";
  document.getElementById("todoListI").innerHTML = "";
  if ($("#todoSort").val() == "byAlphabet") {
    doneS = 0;
    sortAlphabetically();
    addTodosToPage();
    sortDone()
  } else if ($("#todoSort").val() == "byDate") {
    doneS = 0;
    sortByDate();
    addTodosToPage();
    sortDone()
  }
}

function sortByDate() {
  todos.sort(function(a, b){
    if(a.dueDate < b.dueDate) { return -1; }
    if(a.dueDate > b.dueDate) { return 1; }
    console.log(todos)
    return 0;
  })
}

function mysearch() {
  let input, filter, li, a, i, text , li2, d, text2, a2;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  let list = new Array();
  d = document.getElementById("todoList");
  li = d.getElementsByTagName("li");
  list.push(li);
  d = document.getElementById("todoListI");
  li2 = d.getElementsByTagName("li");
  list.push(li2)

  for (i = 0; i < list.length; i++) {
    a = list[0][i].getElementsByTagName("a")[0];
    a2 = list[1][i].getElementsByTagName("a")[0];
    text = a.textContent || a.innerText;
    text2 = a2.textContent || a2.innerText;
    if (text.toUpperCase().indexOf(filter) > -1 && text2.toUpperCase().indexOf(filter) > -1 ) {
      li[i].style.display = "";
      li2[i].style.display = "";
    }else if(text.toUpperCase().indexOf(filter) > -1 || text2.toUpperCase().indexOf(filter) > -1){
      if(text.toUpperCase().indexOf(filter) > -1){
        li[i].style.display = "";
        li2[i].style.display = "none";
      }else if(text2.toUpperCase().indexOf(filter) > -1){
        li[i].style.display = "none";
        li2[i].style.display = "";
      }
    } else {
      li[i].style.display = "none";
      li2[i].style.display = "none";
    }
  }
}

function play() {
  let music=document.getElementById("musicu");
  let audio = document.getElementById("audio");
  if(music.value=="Turn on the beat"){
    audio.play();
    audio.volume=0.02;
    audio.loop=true;
    music.value="Turn off the beat";
    $('body').css('backgroundImage', 'url("bodybuilder.gif")');
  }else{
    audio.pause();
    music.value="Turn on the beat";
    $('body').css('backgroundImage', 'url("car.gif")');
  }
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
  document.getElementById("todoListI").innerHTML = "";
  addTodosToPage();
}