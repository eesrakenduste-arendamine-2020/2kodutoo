class Todo {
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

const todos = [];

// Funktsioon kutsutakse esile faili laadides
loadEntries();

function loadEntries() {

}

function addEntry() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const date = document.getElementById('date').value;


}