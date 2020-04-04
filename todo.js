console.log("fail ühendatud");



class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

class toDo{

    constructor(){
        console.log("toDo sees");

        this.entries = [];
    }

    addEntry(){
        const titleValue = document.querySelector("#title").value;
        const descriptionValue = document.querySelector("#description").value;
        const dateValue = document.querySelector("#date").value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

        console.log(this.entries);

        this.render();
    }

    render(){
        if(document.querySelector(".todo-list")){
            document.body.removeChild(document.querySelector(".todo-list"));
        }

        const ul = document.createElement("ul");
        ul.className = "todo-list";


        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement("li");
            const removeButton = document.createElement("div");
            removeButton.setAttribute("id","delete_button");

            const checkButton = document.createElement("input");
            checkButton.setAttribute("id","check_button");
            checkButton.setAttribute("type","checkbox");

            const removeIcon = document.createTextNode("Eemalda");


            li.classList.add("entry");

            removeButton.addEventListener("click", ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
            });

            if(entryValue.done){
                li.classList.add("task-done");
            }

            li.addEventListener("click", (event)=>{
                event.target.classList.add("task-done");
                this.entries[entryIndex].done = true;
            });

            li.innerHTML = `<div id="text_box">
            <div id="list_title">${entryValue.title} </div>
            <div id="list_description">${entryValue.description} </div>
            <div id="list_date">${entryValue.date}</div></div>`;
            removeButton.appendChild(removeIcon);

            li.appendChild(removeButton);
            li.appendChild(checkButton);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }
}




const ToDo = new toDo();

function saveToFile(){
    $.post('server.php', {save: ToDo.entries}).done(function(){
        console.log(ToDo.entries);
        console.log('Success');
    }).fail(function(){
        alert('FAIL');
    }).always(function(){
        console.log('Tegime midagi AJAXiga');
    });
}


function GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

function loadFromFile(text){

    const sort_order = document.querySelector("#sort_order").value;

    $.get('database.txt', function(data){
        let content = JSON.parse(data).content;

        ToDo.entries = [];

        console.log("LOAD");
        content.sort(GetSortOrder(sort_order));
        content.forEach(function(todo){

            console.log("test"+text);
            if (text !== ""){
                if (todo.description.includes(text) || todo.title.includes(text)){
                    ToDo.entries.push(new Entry(todo.title, todo.description, todo.date));
                }

            }
            else{
                console.log("ALLL");
                ToDo.entries.push(new Entry(todo.title, todo.description, todo.date));
            }

        });
        ToDo.render();
    })

}

function searchTest(){
    const text = document.querySelector("#search").value;
    loadFromFile(text);
}
$('#search').on('keydown', function() {
    searchTest();
});


$('#load').on('click', function() {
    loadFromFile("");
});

$('#save').on('click', function() {
    saveToFile();
});

$('#sort_order').on('change', function() {
    loadFromFile("");
});

$('#add').on('click', function() {
    ToDo.addEntry();
});


loadFromFile("");