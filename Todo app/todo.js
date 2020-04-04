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

   
  
  NumberOfEntries(){
    const list = document.getElementById("todo-list");
    document.write(list.children.length);
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
        NumberOfEntries();
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

 

}

const todo = new Todo();
