/*jshint esversion:6*/
class Entry{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;

  }
}

class ToDo{
  constructor(){
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

    document.querySelector('#addButton').addEventListener('click', () => this.addEntry());
      

    this.render();
  }

  render(){
    if(document.querySelector('.todo-list')){
      document.body.removeChild(document.querySelector('.todo-list'));
    }

    const ul = document.createElement('ul');
    ul.className = 'todo-list';

    this.entries.forEach((entry, entryIndex)=>{
      const li = document.createElement('li');
        
      const removeTaskButton = document.createElement('div');
      const removeIcon = document.createTextNode('\u00D7');
    const joonJoon = document.createElement('hr');

      li.classList.add('entry');
      removeTaskButton.className = "delete-task-button";
    

      li.addEventListener('click', (event)=>{
        event.target.classList.add('task-completed');

        if(entry.done){
          entry.done = false;
        }else{
          entry.done = true;
        }

        this.saveInLocalStorage();
        this.render();
      });

      removeTaskButton.addEventListener('click', ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
        this.saveInLocalStorage();
      });

      if(entry.done){
        li.style.backgroundColor = "#edfff3";
        li.style.borderStyle = "solid";
        li.style.borderColor = "green";
        li.style.borderWidth = "0.5px";
        
      }

      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }

      today = yyyy + '-' + mm + '-' + dd;
      if(entry.date == today){
        li.style.border = "2px solid red";
      }

      removeTaskButton.appendChild(removeIcon);
      li.innerHTML = `<h2> ${entry.title} <br><hr>${entry.description}</hr><br> <h4> ${entry.date}`;
      li.appendChild(removeTaskButton);
      ul.appendChild(li);

    });

    document.body.appendChild(ul);
  }

  addEntry(){
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;

    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

    this.saveInLocalStorage();

    this.render();
  }

  saveInLocalStorage(){
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
}


const todo = new ToDo();
