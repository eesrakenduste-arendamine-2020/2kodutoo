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
        this.saveOnLocalStorage();
        this.render();
    }
 