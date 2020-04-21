function Todo(description, date, level){
    this.description = description;
    this.date = date;
    this.level = level;
    this.deleted = null;
    this.done = false;
}


window.onload = initial;

function initial(){
    loadFromFile();
}

$('#add').click(addEntry);
var todos = new Array();

function addEntry(){
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let level = document.getElementById("level").value;
  console.log("LEVEL" + level);
  let todoItem = new Todo(description, date, level);
  if(todoItem.description == "" || todoItem.date == "" || todoItem.level == null){
    window.alert("Täida kõik väljad");
  } else {
    todos.push(todoItem);
  }
  console.log(todoItem);
  saveToFile();
  addToPage();
  saveLocal(todoItem);
}

//SALVESTAB TODOD FAILI
function saveToFile(){
   let JSONstring = JSON.stringify(todos);
   let newReq = new XMLHttpRequest();
   let url = "server.php?data=" + encodeURI(JSONstring);
   newReq.open("GET", url, true);
   newReq.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
   newReq.send();
}

//SALVESTAB LOCALSTORAGESSE
function saveLocal(){
  localStorage.setItem('todos', JSON.stringify(todos));
}

//LAEB TODOD FAILIST
function loadFromFile(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseTodoItems(this.responseText);
      addToPage();
    }
  }
  xhttp.open("GET", "database.txt", true);
  xhttp.send();
}

function parseTodoItems(JSONtext){
  if (JSONtext == null || JSONtext.trim() == "") {
    return;
  }
  let todoArray = JSON.parse(JSONtext);
  if (todoArray.length == 0) {
    console.log("Error todo list array is empty!");
    return;
  }
    for (let i = 0; i < todoArray.length; i++) {
      let todoItem = todoArray[i];
      todos.push(todoItem);
    }
}

//LISAB TODOD LEHELE
function addToPage(){
  counter = document.getElementById("counter");
  countNum = 0;
  if(document.querySelector('.todoList')){
    document.body.removeChild(document.querySelector('.todoList'));
  }

  const ul = document.createElement('ul');
  ul.className = 'todoList';
  todos.forEach((entryValue, entryIndex)=>{
    const li = document.createElement('li');
    li.classList.add('entry');
    countNum ++;
    const removeButton = document.createElement('BUTTON');
    removeButton.id = "remove";
    const removeIcon = document.createTextNode('Kustuta');
    removeButton.addEventListener('click', ()=>{
      $(li).fadeOut(1000, function(){
        ul.removeChild(li);
        todos.splice(entryIndex, 1);
        saveToFile();
        addToPage();
      });
    });
    if(entryValue.done == true){
      li.classList.add("done");
      countNum = countNum-1;
    } else {
      li.classList.add("not");
    }   
    const doneButton = document.createElement("BUTTON");
    doneButton.id = "dButton"
    if(entryValue.done == false){
      doneButton.innerHTML = "Tehtud";
      li.classList.add("not");
      doneButton.addEventListener('click', ()=>{
        todos[entryIndex].done = true;
        doneButton.innerHTML = "Märgi tegemata";
        saveToFile();
        addToPage();
      });
    } else if (entryValue.done == true){
      doneButton.innerHTML = "Märgi tegemata";
      li.classList.add("done");
      doneButton.addEventListener('click', ()=>{
        todos[entryIndex].done = false;
        li.classList.add("not");
        doneButton.innerHTML = "Tehtud";
        saveToFile();
        addToPage();
      });
    }

    if(JSON.stringify(entryValue.level).replace(/['"]+/g, '') == "low" && JSON.stringify(entryValue.done).replace(/['"]+/g, '') == "false"){
      li.id = "low";
    } 
    if(JSON.stringify(entryValue.level).replace(/['"]+/g, '') == "medium" && JSON.stringify(entryValue.done).replace(/['"]+/g, '') == "false"){
      li.id = "medium";
    }
    if(JSON.stringify(entryValue.level).replace(/['"]+/g, '') == "high" && JSON.stringify(entryValue.done).replace(/['"]+/g, '') == "false"){
      li.id = "high";
    }

    

    counter.innerHTML = "Tegemata ülesandeid: "+countNum;
    li.innerHTML = `${JSON.stringify(entryValue.description).replace(/['"]+/g, '')} <br> <br> Tähtaeg:  ${JSON.stringify(entryValue.date).replace(/['"]+/g, '')}`;
    removeButton.appendChild(removeIcon);
    li.appendChild(doneButton);
    li.appendChild(removeButton);
    ul.appendChild(li);

  });
  document.body.appendChild(ul);
}

//SORTEERIMINE
document.getElementById("sort").addEventListener("change", (event) => {
  console.log("Jõudsin sorteerimiseni");
  const sortSelect = document.getElementById("sort").value;
  if(sortSelect == "dateUp"){
    todos.sort(function (a, b) {
      if(a.date < b.date){
        return -1;
      }
      if (a.date > b.date){
        return 1;
      }
      return 0;
    });
    addToPage();
  } else if(sortSelect == "alphabet"){
    todos.sort(function (a, b){
      if(a.description > b.description){
        return 1
      }
      if(a.description < b.description){
        return -1;
      }
      return 0
    });
    addToPage();
  } else if(sortSelect == "dateDown"){
    todos.sort(function (a, b) {
      if(a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
  } else if(sortSelect == "alphabet2"){
    todos.sort(function (a, b){
      if(a.description > b.description){
        return -1;
      }
      if(a.description < b.description){
        return 1;
      }
      return 0;
    });
  }
  addToPage();
});




document.getElementById("filter").addEventListener("change", (event) => {
  let everything = document.getElementsByClassName("entry");
  const filterSelect = document.getElementById("filter").value;
  if(filterSelect == "uncompleted"){
      for(let i = 0; i < everything.length; i++){
        $(".done").fadeOut(1200);
      }
  } else if(filterSelect == "completed"){
    for(let i = 0; i < everything.length; i++){
      $(".not").fadeOut(1200);
      $(".done").fadeIn(1200);
    }
  } else if(filterSelect == "all"){
    for(let i = 0; i < everything.length; i++){
      $(".not").fadeIn(1200);
      $(".done").fadeIn(1200);
    }
  }
});



