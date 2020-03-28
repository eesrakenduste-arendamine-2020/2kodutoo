class Todo {
    constructor(title, description, dueDate, isChecked = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isChecked = isChecked;
    }
}

const todos = [];
// Funktsioon kutsutakse esile faili laadides
loadEntries();

function loadEntries() {
    $('#todos').html('');
        
    $.get('database.json', function (data) {
        const content = JSON.parse(data.content);
        console.log(content);

        for (const todo of content) {
            todos.push(todo);
            loadNewEntry(todo);
        }
    });
}

function loadNewEntry(todo) {
    $('#todos').append('<ul><li>' + todo.title + '</li><li>' + todo.description + '</li><li>' + todo.dueDate + '</li></ul>');
}

$('#add').click(addEntry);

function addEntry() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const date = document.getElementById('dueDate').value;

    const todo = new Todo(title, desc, date);
    todos.push(todo);
    console.log(todos);

    saveData('server.php', todos).catch((err) => console.error(err));

    loadNewEntry(todo);
}

const testArray = [
    { 'title':'abwefwefwef', 'description':'fwefw', 'dueDate':'2020-03-30', 'isChecked':false }, 
    { 'title':'klwefwefwef', 'description':'fwefw', 'dueDate':'2020-03-31', 'isChecked':true },
    { 'title':'fqwefwefwef', 'description':'fwefw', 'dueDate':'2020-02-31', 'isChecked':true }, 
    { 'title':'posdasda', 'description':'dadasda', 'dueDate':'2019-03-31', 'isChecked':false }, 
    { 'title':'dasdasdaASs', 'description':'dadasda', 'dueDate':'2020-04-01', 'isChecked':false },
];

// Sorteerib ülesanded soovitud key järgi, saab ka tagurpidi sorteerida
function sortEntries(array, key, reverse = false) {
    array.sort(({ [key]: a }, { [key]: b }) => {
        typeof array[key] === 'string' ? a.localeCompare(b) : a - b;
    });
    if (reverse) array.reverse();
}

// Leiame kõik sorteerimisnupud (hetkel 2)
const sortButtons = document.getElementsByClassName('sort-button');

// Igale sorteerimisnupule lisame eventlisteneri
for (const button of sortButtons) {
    button.addEventListener('click', function () { 

        // Kui tal flip classi ei ole siis anname selle
        // Kui on siis eemaldame selle
        // Samal ajal ka sorteerime todos array vastavalt
        if(!this.classList.contains('flip')) {
            this.id === 'sort-title' ? sortEntries(todos, 'title') : sortEntries(todos, 'dueDate');
            this.classList.add('flip');
        } else {
            this.id === 'sort-title' ? sortEntries(todos, 'title', true) : sortEntries(todos, 'dueDate', true);
            this.classList.remove('flip');
        }
    });
}

// Alternatiiv jQuery POST meetodile; asünkroonne, oleks kasutanud Fetch API-t kuid see tegi POST-i asemel GET-i igakord ???
function saveData(url, data) {
    // Promise teeb selle asünkroonseks, muidu peaks callbackidega seda tegema
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                console.log(xhr.responseText);
                resolve();
            } else {
                reject(new Error());
            }
        };
        xhr.onerror = reject;
        // Millegipärast see nii peab käima
        xhr.send('save=' + JSON.stringify(data));
    });
}
