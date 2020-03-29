class Todo {
    constructor(title, description, dueDate, isChecked = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isChecked = isChecked;
    }
}

/*
const testArray = [
    { 'title':'abwefwefwef', 'description':'fwefw', 'dueDate':'2020-03-30', 'isChecked':false }, 
    { 'title':'klwefwefwef', 'description':'fwefw', 'dueDate':'2020-03-31', 'isChecked':true },
    { 'title':'fqwefwefwef', 'description':'fwefw', 'dueDate':'2020-02-31', 'isChecked':true }, 
    { 'title':'posdasda', 'description':'dadasda', 'dueDate':'2019-03-31', 'isChecked':false }, 
    { 'title':'dasdasdaASs', 'description':'dadasda', 'dueDate':'2020-04-01', 'isChecked':false },
];
*/

let todos = [];
// todos = [...testArray];
// Funktsioon kutsutakse esile faili laadides
loadEntries();
renderEntries(todos);

function loadEntries() {
    $('#todos').html(''); // Kas see teeb ka midagi? See vist juba tehakse renderEntries fn-is ära textContent'iga
        
    $.get('database.json', function (data) {
        const content = JSON.parse(data.content);
        console.log(content);

        todos = Array.from(content);
        renderEntries(todos);
    });
}

// Efektiivne viis renderdada todo list
function renderEntries(todos) {
    const todosElement = document.getElementById('todos');
    // Teeme olemasoleva elemendi sisu tühjaks, et seal varasemaid todo-sid ei oleks
    todosElement.textContent = '';
    // Loome virtuaalse dokumendi et me ei peaks HTML-i uuendama iga tsükliga
    const todosContainer = document.createDocumentFragment();
    for (const todo of todos) {
        const todoDiv = document.createElement('div');
        const removeButton = document.createElement('div');
        removeButton.classList.add('delete-button');

        todoDiv.appendChild(removeButton);


        todoDiv.className = 'todo';


        for (const value in todo) {
            // isChecked meid ei huvita hetkel
            if (value !== 'isChecked') {
                const elementDiv = document.createElement('div');
                elementDiv.className = value;
                elementDiv.innerText = todo[value];
                todoDiv.appendChild(elementDiv);
            }
        }
        todosContainer.appendChild(todoDiv);
    }
    todosElement.appendChild(todosContainer);
}

$('#add').click(addEntry);

function addEntry() {
    const title = document.getElementById('titleInput').value;
    const desc = document.getElementById('descriptionInput').value;
    const date = document.getElementById('dueDateInput').value;

    const todo = new Todo(title, desc, date);
    todos.push(todo);
    console.log(todos);

    saveData('server.php', todos).catch((err) => console.error(err));

    renderEntries(todos);
}

// Sorteerib ülesanded soovitud key järgi, saab ka tagurpidi sorteerida
function sortEntries(array, key, reverse = false) {
    array.sort(({ [key]: a }, { [key]: b }) => {
        return typeof a === 'string' ? a.localeCompare(b) : a - b;
    });
    if (reverse) array.reverse();
}

// Leiame kõik sorteerimisnupud (hetkel 2)
const sortButtons = document.getElementsByClassName('sort-button');

// Igale sorteerimisnuptodoDive lisame eventlisteneri
for (const button of sortButtons) {
    button.addEventListener('click', function () { 

        // Kui tal flip classi ei ole siis anname selle
        // Kui on siis eemaldame selle
        // Samal ajal ka sorteerime todos array vastavalt
        if(!this.classList.contains('flip')) {
            this.id === 'sort-title' ? sortEntries(todos, 'title') : sortEntries(todos, 'dueDate');
            this.classList.add('flip');
            renderEntries(todos);
        } else {
            this.id === 'sort-title' ? sortEntries(todos, 'title', true) : sortEntries(todos, 'dueDate', true);
            this.classList.remove('flip');
            renderEntries(todos);
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