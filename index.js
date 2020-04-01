class Todo{
    constructor(description, date){
        this.description = description;
        this.date = date;
        this.deleted = null;
    }
}

var todos = new Array();

window.onload = activate;

function activate(){
    loadFromFile();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("todos").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "database.txt", true);
  xhttp.send();
}

/*$('#load').click(loadFromFile);
//$('#save').click(saveToFile);
$('#add').click(addEntry);*/


// Lükkab todo väärtused massiivi -- Töötab!
function addEntry(){ 
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();
    if(descriptionValue != "" && dateValue != ""){
        todos.push(new Todo(descriptionValue, dateValue));
        console.log("vaata!")
        console.log(todos);
        saveLocal();
        saveToFile();
    } else {
        alert("Täida kõik väljad");
    }
}
function saveLocal(){
    localStorage.setItem('todos', JSON.stringify(todos));
    $.ajax({
        type: "POST",
        data: JSON.stringify(todos),
        url: "server.php",
        success: function(){
          alert(todos);
        }
     });
}

function saveToFile(){
   let JSONstring = JSON.stringify(todos);
   let newReq = new XMLHttpRequest();
   let url = "server.php?data=" + encodeURI(JSONstring);
   console.log("VAATA: " + url);
   newReq.open("GET", url, true);
   newReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   newReq.send();
}
function loadFromFile(){
   
}
//const todo = new ToDo();