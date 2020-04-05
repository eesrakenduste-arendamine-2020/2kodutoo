class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

class Todo{
    constructor();
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];
    document.querySelector('#addButton').addEventListener('click', ()=>{this.addEntry()});
    this.render();
}

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;
        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
        this.saveLocal();
        this.render();
    }
    render(){
        if(document.querySelector('.todo-list')){
          document.body.removeChild(document.querySelector('.todo-list'));
        }
    
        const ul = document.createElement("ul");
        ul.setAttribute("id", "myUl");
        ul.className = "todo-list";
        this.entries.forEach((entry, entryIndex)=>{
          const li = document.createElement("li");
          li.innerHTML = `<b>${entry.title}</b> <br>  ${entry.description} <br>  ${entry.date}`;
    
          let span = document.createElement("SPAN");
          let txt = document.createTextNode("\u00D7");
          span.className = "close";
          span.addEventListener("click", ()=>{
            ul.removeChild(li);
            this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
            this.saveLocal();
          });
    
          li.addEventListener('click', (event)=> {
              event.target.classList.toggle('checked');
              if(entry.done){
                entry.done = false;
              }
              else{
                entry.done = true;
              }
    
              this.saveLocal();
              this.render();
          });
    
          if(entry.done){
            li.classList.toggle('checked');
          }
    
          span.appendChild(txt);
          li.appendChild(span);
          ul.appendChild(li);
        });
        document.body.appendChild(ul);
      }
    
    
      
    
      saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
      }
    }
 