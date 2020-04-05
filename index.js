loadFromFile();
loadAllData();

let todos = [];
let maxID = 0;
let currentId = 0;

$('#addHomeWork').click(addHomeWork);
$('#todosLogger').click(logTodos);

class Todo {
    constructor(title, description, date, checkbox, id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.checkbox = checkbox;
        this.id = id;
    }
}

function loadAllData() {
    $.get('database.txt', data => {
        let content = JSON.parse(data).content;
        content.forEach(function ({checkbox, date, description, title, id}) {
            if (id > maxID) {
                id++;
                maxID = id;
            } else {
                id++;
            }
            todos.push(new Todo(title, description, date, checkbox, maxID))
        });
    });
}


function logTodos() {
    console.log(todos);
    console.log(maxID)
}


function deleteMe() {
    saveCurrentWork();
    todos = [];
    console.log(todos);
    $.post('server.php', {save: todos}).done(function () {
        console.log('[+] Deleted');
        console.log(todos);

    }).fail(function () {
        alert('[+] Delete failed');
        console.log(todos)
    });
    loadFromFile();
}

function maxidTaker(id) {
    if (id > maxID){
        maxID = id;
    }

}

function loadFromFile() {
    $('#todos').html("");

    $.get('database.txt', data => {
        let content = JSON.parse(data).content;
        content.forEach(function ({checkbox, date, description, title, id}) {
            function checkBox() {
                if (checkbox === "true") {
                    return "<input type=\"checkbox\" class=\"checkbox\" checked/>"
                } else {
                    return "<input type=\"checkbox\" class=\"checkbox\"/>"
                }
            }
            maxidTaker(id);
            if (id > maxID){
                id++;
                maxID = id;
            } else {
                id++;
            }

            $('#todos').append(`<ul><li>Title: ${title}</li><li>Description: ${description}</li><li>Date: ${date}</li><li>Status: ${checkBox()}</li>`);
        });
    });

}

function checkId(currentId) {
    if (currentId > maxID) {
        currentId++;
        maxID = currentId;
    } else {
        currentId++;
    }
    return currentId;
}

function saveCurrentWork() {

    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();
    let checkBox = checkBoxTest(".checkbox");
    currentId = checkId(currentId);

    todos.push(new Todo(titleValue, descriptionValue, dateValue, checkBox, currentId));
}

function addHomeWork() {
    saveCurrentWork();
    $.post('server.php', {save: todos}).done(function () {
        console.log('[+] Uploaded');
    }).fail(function () {
        alert('[+] Upload Failed');
    });
    loadFromFile();
}

function checkBoxTest(element) {
    if (document.querySelector(element).checked) {
        return "true";
    } else {
        return "false";
    }
}


logTodos();