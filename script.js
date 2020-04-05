class Todo {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
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
    const date = document.getElementById('dueDate').value;


}

const url = 'server.php';
const data = {
    title: 'test',
    desc: 'sadawdawdw2adaw',
};

function saveData(url, data) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve();
            } else {
                reject(new Error());
            };
        }
        xhr.onerror = reject;
        xhr.send('save=' + JSON.stringify(data));
    });
}
saveData(url, data)
    .catch((err) => console.log(err));
