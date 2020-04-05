console.log("Files connected");

class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.important = false;
        this.done = false;
    }
}

class ToDo{
    constructor(){
        console.log("Inside the To-Do");

        document.querySelector('#add').addEventListener('click', ()=>{this.addEntry()});
        document.querySelector('#save').addEventListener('click', ()=>{this.saveToFile()});

        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        this.render();
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

        console.log(this.entries);
        this.saveLocal();
        this.render();       
    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));
        }

        const ul = document.createElement('ul');
        ul.className = 'todo-list';


        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            const removeButton = document.createElement('div');
            removeButton.classList.add('delete-button');
            const removeIcon = document.createTextNode('x');
            li.classList.add('entry');

            const importantButton = document.createElement('div');
            importantButton.classList.add('important-button');
            const importantIcon = document.createTextNode('Mark as important');

            importantButton.addEventListener('click', (event)=>{
                event.target.classList.add('task-important');
                this.entries[entryIndex].important = true;
                li.classList.add('task-important');
                this.saveLocal;
            });

            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
                this.render();
            });

            if(entryValue.done){
                li.classList.add('task-done');
            }

            li.addEventListener('dblclick', (event)=>{
                event.target.classList.add('task-done');
                this.entries[entryIndex].done = true;
                this.saveLocal();
            });

            /* if(entryValue.important){
                li.classList.add('task-important');
            }

            li.addEventListener('click', (event)=>{
                event.target.classList.add('task-important');
                this.entries[entryIndex].important = true;
                this.saveLocal();
            }) */

            li.innerHTML = `${entryValue.title} <br> ${entryValue.description} <br> ${entryValue.date}`;
            removeButton.appendChild(removeIcon);
            importantButton.appendChild(importantIcon);
            li.appendChild(importantButton);
            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
        console.log("Saved to local storage");
    }

    saveToFile(){
        $.post('server.php', {save: this.entries}).done(function(){
            console.log("To-Do's succesfully saved");
        }).fail(function(){
            alert("To-Do save failed");
        }).always(function(){
            console.log("Something has been done using AJAX");
        })
    }
}

const todo = new ToDo();