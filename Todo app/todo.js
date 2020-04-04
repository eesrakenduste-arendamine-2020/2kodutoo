/*window.onload = function(){
  document.write(count);
}*/

class Entry {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
   
  }
}

let entries = [];

let count = 0;
let countContainer = document.querySelector('#count');

const clear = document.querySelector(".clear");

clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
  title.value='';
  description.value="";
});



class Todo {
  constructor() {
    this.entries = JSON.parse(window.localStorage.getItem("entries")) || [];
    $('#submitEdit').on('click', editTask);
    document.querySelector("#save").addEventListener("click", () => {
      this.addEntry();
      this.saveToFile();
      
    });

    
   
    this.render();
  }
    
  saveToFile(){
  
    $.post('server.php', {save: this.entries}).done(function(){
         alert('Success');
     }).fail(function(){
         alert('FAIL');
     });
   
  }

  setCurrent(){
    localStorage.setItem('currentTitle', $(this).data('title'));
    localStorage.setItem('currentDescription', $(this).data('description'));
    localStorage.setItem('currentDate', $(this).data('date'));

    $('#editTitle').val(localStorage.getItem('currentTitle'));
    $('#editDate').val(localStorage.getItem('currentDescription'));
    $('#editDescription').val(localStorage.getItem('currentDate'));
  }

  editTask(){
      let currentTitle = localStorage.getItem('currentTitle');
      let currentDate = localStorage.getItem('currentDate');
      let currentDescription = localStorage.getItem('currentDescription');
  
      this.entries = getEntryObject(); 
  
      for(let i=0; i< this.entries.length; i++){
        if(this.entries[i].Title == currenttitle && this.entries[i].date == currentDate && this.entries[i].description == currentDescription){
          this.entries.splice(i, 1);
        }
        localStorage.setItem('entries', JSON.stringify(this.entries));
      }
  
      let titleValue = $('#editTitle').val();
      let dateValue = $('#editDate').val();
  
      let update_todo = {
        titleValue: titleValue,
        date: dateValue,
        descriptionValue: descriptionValue 
      };
  
      this.entries.push(update_todo);
  
      alert("Ülesanne muudetud");
  
      localStorage.setItem('entries', JSON.stringify(this.entries));
  
      window.location.href = "todo.html";
  
      return false;
    }

  
  
  addEntry() {

    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();

    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    count ++;
   
    countContainer.innerHTML = count;
    console.log(this.entries);
    this.saveLocal();
    this.render();
  }

  render() {
    if (document.querySelector(".todo-list")) {
      document.body.removeChild(document.querySelector(".todo-list"));
    }
    const ul = document.createElement("ul");
    ul.className = "todo-list";

    this.entries.forEach((entryValue, entryIndex) => {
      const li = document.createElement("li");
      li.classList.add("entry");
      const div = document.createElement("div");
      div.classList.add("entry-value");
      const removeButton = document.createElement("div");
      removeButton.className = "delete-button";
      const removeIcon = document.createTextNode("X");

      div.innerHTML = `<div>${entryValue.title}</div><div> ${entryValue.description}</div>
            <div>${entryValue.date}</div>`;

      removeButton.addEventListener("click", () => {
        ul.removeChild(li);
        this.entries.splice(entryIndex, 1);
        this.saveLocal();
        this.render();
        this.setCurrent(); 
        //this.showTodos();
        
      });

      if (entryValue.done) {
        li.classList.add("task-completed");
      }

      div.addEventListener("click", () => {
        if (entryValue.done) {
          li.classList.remove("task-completed");
          this.entries[entryIndex].done = false;
          this.saveLocal();
          this.saveToFile();

        } else {
          li.classList.add("task-completed");
          this.entries[entryIndex].done = true;
          this.saveLocal();
          this.saveToFile();
        }
      });

      removeButton.appendChild(removeIcon);
      li.appendChild(div);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
  }

  saveLocal() {
    window.localStorage.setItem("entries", JSON.stringify(this.entries));
  }


  showTodos(){
    this.entries = getTodoObject();

    if(this.entries != "" && this.entries != null){
      for(let i = 0; i < this.entries.length; i++){
        $('#this.entries').append('<li class="ui-body-inherit ui-li-static">'+ this.entries[i].task+ '<br>'+ this.entries[i].date +'<div class="controls"><a href="#edit" id="editLink" data-task="'+this.entries[i].task + '" data-date="' + this.entries[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="'+this.entries[i].task + '" data-date="' + this.entries[i].date + '" onclick="return confirm(\'Kas oled kindel, et tahad ülesannet kustutada?\')">Kustuta</a></div></li>');
      }
    }

  }



  getEntryObject(){
    let currentEntries = localStorage.getItem('entries');

    if(currentEntries != null){
      this.entries = JSON.parse(currentEntries);
    } else{
      this.entries = [];
    }

    return this.entries.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });

  }

 

}

const todo = new Todo();
