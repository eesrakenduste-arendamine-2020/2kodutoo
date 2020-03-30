class Todo {
    constructor(title, description, dueDate, isImportant = false, isChecked = false) {
        this.id = this.generateQuickGuid();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isImportant = isImportant;
        this.isChecked = isChecked;
    }

    get id() {
        return this.id;
    }

    // https://stackoverflow.com/a/13403498
    generateQuickGuid() {
        return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
}

// Garanteerib et uus instance Todo-st on kasutamata ID-ga, teisisõnu soovitaks uusi Todo-sid genereerida ainult selle funktsiooniga
// Tõenäosus, et ta läheb rekursiooni on alla ~1/1000000
function instantiateTodo(mapToCompareAgainst, title, description, dueDate) {
    const todo = new Todo(title, description, dueDate);
    return mapToCompareAgainst.has(todo.id) ? instantiateTodo(mapToCompareAgainst, title, description, dueDate) : todo;
}

let todos = new Map();

// Map ei serialiseeru normaalselt, seega peame sellist hacki tegema, et kirjutame üle ta toJSON-i fn-i
todos.toJSON = () => {
    return [...todos.entries()];
};

// Üritame leida database.json-i üles, kui see on olemas siis kirjutame todos Map-i üle
fetch('database.json')
    .then(response => {
        if (response.status === 200) {
            todos = new Map(response.json()
                .map(todo => {
                    return [todo.id, new Todo(todo.title, todo.description, todo.dueDate, todo.isImportant, todo.isChecked)];
                }));
            renderEntries();
        } else {
            throw new Error('Something went wrong on the server!');
        }
    })
    .catch(error => {
        console.error(error);
    });

// Efektiivne viis renderdada todo list
function renderEntries() {

    const todosElement = document.getElementById('todos');
    // Teeme olemasoleva elemendi sisu tühjaks, et seal varasemaid todo-sid ei oleks
    todosElement.textContent = '';
    // Loome virtuaalse dokumendi et me ei peaks HTML-i reflow-i triggerima iga tsükliga, vaid saame lõpus lihtsalt ühe korraga ära lehe uuendada
    const todosContainer = document.createDocumentFragment();
    
    // Käime kõik todo-d läbi ükshaaval
    for (const todo of todos) {

        // Iga todo individuaalne container
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';

        // Label mille sisse läheb inputCheckbox
        const label = document.createElement('label');
        label.className = 'checkbox';

        // input mille type=checkbox
        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('type', 'checkbox');

        // Paneme inputCheckbox-i label-i sisse
        label.appendChild(inputCheckbox);
        // Paneme label-i todoDiv-i sisse
        todoDiv.appendChild(label);
        
        // Käime kõik todo võtmed läbi ükshaaval
        for (const value in todo) {
            // isChecked meid ei huvita hetkel
            if (value !== 'isChecked') {
                const elementDiv = document.createElement('div');
                elementDiv.className = value;
                elementDiv.innerText = todo[value];
                todoDiv.appendChild(elementDiv);
            }
        }

        // importantButton
        const importantButton = document.createElement('div');
        importantButton.classList.add('important-button');
        importantButton.addEventListener('click', importantButtonHandler);        
        todoDiv.appendChild(importantButton);

        // removeButton
        const removeButton = document.createElement('div');
        removeButton.classList.add('delete-button');
        removeButton.addEventListener('click', removeButtonHandler);
        todoDiv.appendChild(removeButton);

        // Lisame individuaalse todo containeri kõiki todosid sisaldavase virtuaalkonteinerisse
        todosContainer.appendChild(todoDiv);
    }
    
    // Kõige viimane tegevus, lisab terve virtuaalkonteineri (ja selle kõik elemendid) leheküljele
    todosElement.appendChild(todosContainer);
}

function importantButtonHandler() {
    if(!this.parentNode.classList.contains('important-task')) {
        this.parentNode.classList.add('important-task');
    } else {
        this.parentNode.classList.remove('important-task');
    }
}

function removeButtonHandler() {
    this.parentNode.remove();
}

$('#add').click(addEntry);

function addEntry() {
    const title = document.getElementById('titleInput').value;
    const desc = document.getElementById('descriptionInput').value;
    const date = document.getElementById('dueDateInput').value;

    const todo = instantiateTodo(title, desc, date);

    todos.push(todo);
    console.log(todos);

    saveData('server.php', todos)
        .catch(error => console.error(error));

    renderEntries();
}

function editEntry(overwrites = {}) {

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
            renderEntries();
        } else {
            this.id === 'sort-title' ? sortEntries(todos, 'title', true) : sortEntries(todos, 'dueDate', true);
            this.classList.remove('flip');
            renderEntries();
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
                reject(new Error('Something went wrong on the server'));
            }
        };
        xhr.onerror = reject;
        // Millegipärast see nii peab käima
        xhr.send('save=' + JSON.stringify(data));
    });
}
