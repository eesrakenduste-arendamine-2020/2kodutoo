class Todo{
    constructor(title, description, date){

        this.title = title;
        this.description = description;
        this.date = date;
    }
}

let todos = [];
let maxIndex = 0;

$('#load').click(loadFromFile);
$('#save').click(saveToFile);
$('#add').click(addEntry);


window.addEventListener("load", function(){
    loadFromFile();
});

function loadFromFile(){
    $('#todos').html("");

    let index = 0;

    $.get('database.txt', function(data){
        console.log(data);
        if (data === ""){
            console.log("tühi");
            index = 0;
        }
        else{

        }
        let content = JSON.parse(data).content;


        content.forEach(function(todo, todoIndex){
            $('#todos').append("<ul><li>" + todo.title + "</li><li>" + todo.description + "</li><li>" + todo.date + "</li><li>" + todo.index + "</li></ul>");
            maxIndex = todo.index;
            console.log(todo.index);
        });

        console.log("max index:"+maxIndex);
    })
}

function addEntry(){
    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();
    todos.push(new Todo(titleValue, descriptionValue, dateValue, parseInt(maxIndex)+1));
    maxIndex = parseInt(maxIndex)+1;
    console.log(todos);
}

function saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
        console.log('Success');
    }).fail(function(){
        alert('Error');
    }).always(function(){
        console.log('Tegime midagi AJAXiga');
    });
}