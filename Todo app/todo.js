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
    
  //saveToFile(){
  //$.post('server.php', {save: this.entries}).done(function(){
	  
     saveToFile(){
	$.post('server.php', {save: this.entries}).done(function(){
		console.log('done');
	  }).fail(function(){
		console.log('fail');
	  }).always(function(){
		console.log('always');
	  });
	  
	}
	updateFile(){	
	}

	search(){
	let input = $('#myInput').val();
	console.log(input);
	input = input.toLowerCase();
	let ul = document.getElementsByClassName('this.entries');
	let li = $(ul).find("li");
	console.log(ul.length);
	for(let i = 0; i < ul.length; i++){
		for(let j = 0; j < li.length; j++){
		if(!li[j].innerHTML.toLowerCase().includes(input)){
			li[j].style.display ="none";
		}else{
			li[j].style.display ="";
		}
	}
		//siia vaja midagi
	}
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
        if(this.entries[i].Title == currentTitle && this.entries[i].date == currentDate && this.entries[i].Description == currentDescription){
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
