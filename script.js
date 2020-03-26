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

const url = 'server.php';
const data = {
    title: 'test',
    desc: 'sadawdawdwadaw',
};

async function saveData(url, data) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () { this.status >= 200 && this.status < 300 ? resolve : reject }
        xhr.onerror = reject;
        xhr.send('save=' + JSON.stringify(data));
    });
}
saveData(url, data).then((result) => console.log(result));