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

}

$('#add').click(addEntry);


function addEntry() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const date = document.getElementById('dueDate').value;

    todos.push(new Todo(title, desc, date));
    console.log(todos);

    saveData('server.php', todos).catch((err) => console.error(err));
    
}

// Leiame kõik sorteerimisnupud (hetkel 2)
const sortButtons = document.getElementsByClassName('sort-button');

// Igale sorteerimisnupule lisame eventlisteneri
for (const button of sortButtons) {
    button.addEventListener('click', function () { 

        // Kui tal flip classi ei ole siis anname selle
        // Kui on siis eemaldame selle
        if(!this.classList.contains('flip')) {
            this.classList.add('flip');
        } else {
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
