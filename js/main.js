class Task {
  constructor(taskDate, taskName, isImportant) {
    this._id = Math.random();
    this._taskDate = taskDate;
    this._taskName = taskName;
    this._isDone = false;
    this._isImportant = isImportant;
  }
}
// Task storage array
taskArray = [];
lsTasks = [];

// Onload reads local storage and prints data if exists.
window.onload = function() {
  JSON.parse(localStorage.getItem("Tasks")) != null ? taskArray = JSON.parse(localStorage.getItem("Tasks")).slice() :
    localStorage.setItem("Tasks", JSON.stringify(taskArray));
  printList();
};
// Condensing html dublicates
/*
⣠⠴⠖⠒⠚⠋⠉⠉⠉⠙⠒⠒⠲⢤⡀⢀⡀⠤⠐⠒⠐⠒⠒⠒⠒⠒⠒⠶⢮⣿
⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡀⠀⠀⠀⠙⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈
⠀⠀⠀⠀⠀⠀⣴⣿⣙⣿⣿⡄⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣹⣷⣦⠀
⠀⠀⠀⠀⠀⠀⢻⣯⣨⣏⣹⠃⠀⠀⠀⡘⠀⠀⠀⠀⠀⠀⠀⠀⠈⢏⢈⣧⠝⠀
⣄⡀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⢀⡤⠞⢳⡤⣄⣀⡀⠀⠀⠀⠀⠀⠀⢀⣀⣠⡤
⢦⣍⡛⠒⠶⠤⢤⣤⣤⠶⠶⣛⣡⠀⣰⠟⠀⠀⠈⠉⠙⠛⠛⠛⠛⠛⠉⠉⢀⣴
⠀⠉⠛⠛⠓⠒⠶⠶⠖⠛⢛⣋⡵⠛⠉⠀⠀⠢⢄⡀⠀⠀⠀⠀⠀⠀⣀⡴⠛⠁
⠀⠀⠀⠀⠀⠀⠀⠀⣤⠾⠛⠉⠀⠀⠀⠀⠀⠀⠀⠉⠻⣶⠶⠶⠶⠟⠛⣇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠥⠀⠀⠀⠀⠈⢷⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻
⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡛⠛⠛⠹⠿⠻⠶⢶⣦⣤⣤⣀⣀⣀⣀⣀⣀⣀⣀⢀⣀⣀⡀⣀⣀⣀⣠⣴⡶⠿
⣶⣶⣦⣤⣴⣄⣀⡨⠀⡁⠈⠉⠉⠛⠻⠛⠛⠛⠿⠿⠿⠿⠟⠛⠛⠋⠉⢈⣨⣤
⠀⠀⠀⠉⠉⠉⠉⠋⠛⠳⢷⠶⣾⣯⣦⣤⣤⣤⣤⣤⣤⣤⣴⣶⡾⣧⣞⠛⣻⠁
⠿⠿⠷⠶⢿⣦⣤⣦⣰⣄⣄⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣰⣼⠟⠀ */

function setHtml(index,value) {
  let importanceString = value._isImportant ? "<p id = 'important'>This task is important!</p>":"<p>Not important task but you should do it!</p>";
  let isDoneText = value._isDone ? "Done" : "Not done yet";
  $("#result").append(
    `   <div class="${isDoneText}" id="task${index}">
        <h4> I have to: </h4> <p> ${value._taskName}</p>
        <h4> Date: </h4><p>${value._taskDate}<br></p>
        ${importanceString}
        <a onclick="deleteTask(${index})" href="#">
        <img border="0" alt="Delete" src="img/delete.svg" width="35" height="50"></a>
        <a onclick="markAsDone(${index})" href="#">
        <img border="0" alt="Delete" src="img/taskdone.svg" width="47" height="45"> </a>
        <p>${isDoneText}</p>
        </div>`
);
}
// Prints tasks in the taskArray
function printList() {
    //Emptying the div so it's printed just once
    $('div#result').empty();
    $(document).ready(function () {
      $.each(taskArray, function (index, value) {
        setHtml(index,value);
      });
    });
  }
function printArray() {
  taskArray.forEach(element => console.log(element._taskDate));
}
printArray();
//Validate input

function checkForm(x,y) {
  // validation fails if the input is blank
  if (x === "" || y === "") {
    alert("Error: Input is empty!");
    x.focus();
    return false;
  }
  else{
    taskAdd(x,y);
  }
}


// Add task
function taskAdd(x,y){
  let newTask = new Task(x,y,document.getElementById("isImportant").checked);
  taskArray.push(newTask);
  localStorage.setItem("Tasks", JSON.stringify(taskArray));
  printList();
}

// Deletes task from taskArray using index
function deleteTask(index){
  $( document ).ready( function () {
    taskArray.splice(index,1);
    localStorage.setItem("Tasks", JSON.stringify(taskArray));
    printList();
  });
}

// Marks task as done , can undo
function markAsDone(index) {
  $( document ).ready( function () {
    taskArray[index]._isDone = !taskArray[index]._isDone;
    localStorage.setItem("Tasks", JSON.stringify(taskArray));
    printList();
  });
}

// Sorting tasks by date. toggle between asc. & desc. order
toggleForDateSorting = false;

function toggleSortByDate() {
  toggleForDateSorting ? sortByDateDesc() : sortByDateAsc();
}

function sortByDateAsc() {
  toggleForDateSorting = true;
  var taskArraySorted = taskArray.slice(0);
  taskArraySorted.sort((a,b) => {
    if(a._taskDate > b._taskDate) return 1;
    if(a._taskDate < b._taskDate) return -1;
    return 0;
  });
  $('div#result').empty();
  $(document).ready(function () {
    $.each(taskArraySorted, function ( index, value ) {
      setHtml(index,value);
    });
  });
}

function sortByDateDesc() {
  toggleForDateSorting = false;
  var taskArraySorted = taskArray.slice(0);
  taskArraySorted.sort((a,b) => {
    if(a._taskDate > b._taskDate) return -1;
    if(a._taskDate < b._taskDate) return 1;
    return 0;
  });
  $('div#result').empty();
  $(document).ready(function () {
    $.each(taskArraySorted, function ( index, value ) {
      setHtml(index,value);
    });
  });
}

// Sorting tasks by name, toggles between ascending and descending order
toggleForNameSorting = false;

function toggleSortByName() {
  toggleForNameSorting ? sortByNameAsc() : sortByNameDesc();
}

function sortByNameAsc() {
  toggleForNameSorting = false;
  var taskArraySorted = taskArray.slice(0);
  taskArraySorted.sort((a,b) => {
    var nameA=a._taskName.toLowerCase(), nameB=b._taskName.toLowerCase();
    if(nameA > nameB) return 1;
    if(nameA < nameB) return -1;
    return 0;
  });
  $('div#result').empty();
  $(document).ready(function () {
    $.each(taskArraySorted, function ( index, value ) {
      setHtml(index,value);
    });
  });
}

function sortByNameDesc() {
  toggleForNameSorting = true;
  var taskArraySorted = taskArray.slice(0);
  taskArraySorted.sort((a,b) => {
    var nameA=a._taskName.toLowerCase(), nameB=b._taskName.toLowerCase();
    if(nameA > nameB) return 1;
    if(nameA < nameB) return -1;
    return 0;
  });
  taskArraySorted.reverse();
  $('div#result').empty();
  $(document).ready(function () {
    $.each(taskArraySorted, function ( index, value ) {
      setHtml(index,value);
    });
  });
}
