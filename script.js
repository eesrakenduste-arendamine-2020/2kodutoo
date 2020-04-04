class Todo {
    constructor(title, description, dueDate, isImportant = false, isChecked = false, id = this.generateQuickGuid()) {

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isImportant = isImportant;
        this.isChecked = isChecked;
        this.id = id;
    }

    // https://stackoverflow.com/a/13403498
    generateQuickGuid() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
}

// Selle õuduse eksisteerimise põhjuseks on see, et on vaja Map-i ja Array-d sünkroonis hoida, Map-is on kiired lookupid ja Array-d saab kiirelt sorteerida
// See kombinatsioon iseenesest tõenäoliselt väga palju kiirem ei ole tavalisest objektide array-st (kui on üldse)
// Sünkroonis hoidmiseks igakord kui TodoMap-i uuendame siis uuendame kohe ka Array-d automaatselt ilma et seda peaks ise igas koodijupis manuaalselt tegema
class TodoMap extends Map {
    set(...args) {
        const map = super.set(...args);
        // Seda vist saaks kiiremaks teha...
        todosView = [...this.values()];
        renderEntries(todosView);
        return map;
    }

    delete(...args) {
        const map = super.delete(...args);
        todosView.splice(todosView.findIndex(todo => todo.id === args[0]), 1);
        renderEntries(todosView);
        return map;
    }

    // Map ei serialiseeru normaalselt, seega anname talle toJSON fn-i https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON_behavior
    toJSON() {
        return [...super.entries()];
    }
}

// Garanteerib et uus instance Todo-st on kasutamata ID-ga, teisisõnu soovitaks uusi Todo-sid genereerida ainult selle funktsiooniga
// Tõenäosus, et ta läheb rekursiooni on alla ~1/1000000
function instantiateTodo(mapToCompareAgainst, title, description, dueDate) {
    const todo = new Todo(title, description, dueDate);
    return mapToCompareAgainst.has(todo.id) ? instantiateTodo(mapToCompareAgainst, title, description, dueDate) : todo;
}

const todos = new TodoMap();
// Saab muuta const-iks kui TodoMap.prototype.set() teha normaalsemaks, mitte uut array-d luua iga kord
let todosView = [];

loadEntries();

// Efektiivne viis renderdada todo list
// Tõenäoliselt saab teha asünkroonseks ilma probleemideta
async function renderEntries(todosArray) {

    const todosElement = document.getElementById('todos');

    // Loome virtuaalse dokumendi et me ei peaks HTML-i reflow-i triggerima iga tsükliga, vaid saame lõpus lihtsalt ühe korraga ära lehe uuendada
    const todoFragment = document.createDocumentFragment();

    // Teeme konteineri mida saame hiljem asendada
    const todoFrame = document.createElement('div');
    todoFrame.id = 'todo-frame';

    // Käime kõik todo-d läbi ükshaaval
    for (const todo of todosArray) {

        // Iga todo individuaalne container
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';

        // Label mille sisse läheb inputCheckbox
        const label = document.createElement('label');

        // input mille type=checkbox
        const inputCheckbox = document.createElement('input');
        inputCheckbox.className = 'checkbox';
        inputCheckbox.type = 'checkbox';
        inputCheckbox.addEventListener('click', () => {checkboxHandler(todo);});

        // div checkbox-i kõrvale
        const div = document.createElement('div');
        div.className = 'checkbox-decoy';

        // Paneme inputCheckbox-i ja div-i label-i sisse
        label.appendChild(inputCheckbox);
        label.appendChild(div);
        // Paneme label-i todoDiv-i sisse
        todoDiv.appendChild(label);

        // Käime kõik todo võtmed läbi ükshaaval
        for (const item in todo) {

            if (item === 'isChecked') {
                if (todo[item]) { 
                    todoDiv.classList.add('checked');
                    // Kuna seda HTML ei tee kui iga klikiga laetakse see osa DOM-ist uuesti
                    // aga ma tahan seda sest see teeb CSS-i natuke lihtsamaks
                    inputCheckbox.checked = true;
                }
                continue;
            } else if (item === 'isImportant') {
                if (todo[item]) todoDiv.classList.add('important-task');
                continue;
            } else if (item === 'id') {
                continue;
            }
            
            const elementDiv = document.createElement('div');
            elementDiv.className = item;
            elementDiv.innerText = todo[item];
            todoDiv.appendChild(elementDiv);
        }

        // importantButton
        const importantButtonContainer = document.createElement('div');
        importantButtonContainer.classList.add('important-button-container');
        const importantButton = document.createElement('div');
        importantButton.classList.add('important-button');
        importantButtonContainer.addEventListener('click', () => {importantButtonHandler(todo);});
        importantButtonContainer.appendChild(importantButton)
        todoDiv.appendChild(importantButtonContainer);

        // removeButton
        const removeButtonContainer = document.createElement('div');
        removeButtonContainer.classList.add('delete-button-container');
        const removeButton = document.createElement('div');
        removeButton.classList.add('delete-button');
        removeButtonContainer.addEventListener('click', () => {removeButtonHandler(todo.id);});
        removeButtonContainer.appendChild(removeButton);
        todoDiv.appendChild(removeButtonContainer);

        // Lisame individuaalse todo containeri kõiki todosid sisaldavase virtuaalkonteinerisse
        todoFrame.appendChild(todoDiv);
        todoFragment.appendChild(todoFrame);
    }

    // Kõige viimane tegevus, lisab terve virtuaalkonteineri (ja selle kõik elemendid) leheküljele
    // Me võime textContenti tühjaks teha ja siis alati appendChild teha kuid see teeks kokku 2 reflow-i funktsiooni jooksul
    // Kasutades .replaceWith() saame terve funktsiooni läbida 1 reflow-iga
    todosElement.textContent === '' ? todosElement.appendChild(todoFragment) : document.getElementById('todo-frame').replaceWith(todoFragment);

    const sortTitle = document.getElementById('sort-title');
    const dueDate = document.getElementById('sort-date');
    if (dueDate.classList.contains('flip')) {
        sortEntries(todosView, 'title', true);
    } else if (sortTitle.classList.contains('flip')) {
        sortEntries(todosView, 'dueDate', true);
    }
}

function importantButtonHandler(todo) {
    todo.isImportant = !todo.isImportant;
    todos.set(todo.id, todo);
    saveData('server.php', todos)
        .catch(error => console.error('Salvestamine ebaõnnestus', error));
}

function removeButtonHandler(id) {
    todos.delete(id);
    saveData('server.php', todos)
        .catch(error => console.error('Salvestamine ebaõnnestus', error));
}

function checkboxHandler(todo) {
    todo.isChecked = !todo.isChecked;
    todos.set(todo.id, todo);
    saveData('server.php', todos)
        .catch(error => console.error('Salvestamine ebaõnnestus', error));
}

document.getElementById('add').addEventListener('click', () => {
    const titleInput = document.getElementById('titleInput');
    if (titleInput.value) addEntry(); 
});

function addEntry() {
    const title = document.getElementById('titleInput').value;
    const desc = document.getElementById('descriptionInput').value;
    const date = document.getElementById('dueDateInput').value;

    const todo = instantiateTodo(todos, title, desc, date);

    todos.set(todo.id, todo);

    saveData('server.php', todos)
        .catch(error => console.error('Salvestamine ebaõnnestus', error));
}

// Sorteerib ülesanded soovitud key järgi, saab ka tagurpidi sorteerida
function sortEntries(array, key, reverse = false) {
    array.sort(({ [key]: a }, { [key]: b }) => {
        return typeof a === 'string' ? a.localeCompare(b) : a - b;
    });
    if (reverse) array.reverse();
    renderEntries(todosView);
}

// Leiame kõik sorteerimisnupud (hetkel 2)
const sortButtons = document.getElementsByClassName('sort-button');

// Igale sorteerimisnuptodoDive lisame eventlisteneri
for (const button of sortButtons) {
    button.addEventListener('click', function () {

        // Kui tal flip classi ei ole siis anname selle
        // Kui on siis eemaldame selle
        // Samal ajal ka sorteerime todos array vastavalt
        if (!this.classList.contains('flip')) {
            this.id === 'sort-title' ? sortEntries(todosView, 'title') : sortEntries(todosView, 'dueDate');
            this.classList.add('flip');
        } else {
            this.id === 'sort-title' ? sortEntries(todosView, 'title', true) : sortEntries(todosView, 'dueDate', true);
            this.classList.remove('flip');
        }
    });
}

// Üritame leida database.json-i üles, kui see on olemas siis kirjutame todos Map-i üle
async function loadEntries() {
    let jsonDatabase = await fetch('database.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.warn('Failed to load database from the server!');
            }
        })
        .catch(error => {
            console.warn('Tühi või vigane JSON fail', error);
        });

    if (!jsonDatabase) {
        // Laeme localStorage-ist kui fetch ebaõnnestub
        if (!localStorage.getItem('todos')) {
            return;
        }
        jsonDatabase = JSON.parse(localStorage.getItem('todos'));
    }

    for (const [id, todo] of jsonDatabase) {
        todos.set(id, new Todo(todo.title, todo.description, todo.dueDate, todo.isImportant, todo.isChecked, id));
    }
}

// Alternatiiv jQuery POST meetodile; asünkroonne, oleks kasutanud Fetch API-t kuid see tegi POST-i asemel GET-i igakord ???
function saveData(url, data) {
    // Kirjutame localStorage-isse et saada punkt selle eest
    localStorage.setItem('todos', JSON.stringify(todos));

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
