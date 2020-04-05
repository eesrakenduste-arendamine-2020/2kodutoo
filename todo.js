class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
        this.important = false;
        this.missed = false;
    }
}

class Todo{
    constructor(){
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        document.querySelector('#addButton').addEventListener('click', ()=>{this.addEntry();});

        this.render();
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

        this.saveLocal();

        this.render();
    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));

        }
        const ul = document.createElement('ul');
        ul.className = "todo-list";

        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            li.classList.add('entry');
            // li.classList.add('hidden');
            const div = document.createElement('div');
            div.classList.add('entry-value');
            const doneButton = document.createElement('div');
            doneButton.className = "done-button";
            const doneIcon = document.createTextNode('✓');
            const removeButton = document.createElement('div');
            removeButton.className = "delete-button";
            const removeIcon = document.createTextNode('X');

            div.innerHTML = `<div id = "title">${entryValue.title}</div><div> ${entryValue.description}</div>
            <div id = "date">${entryValue.date}</div>`;

            removeButton.addEventListener('click', ()=>{
                $(li).animate({
                    opacity:".0"
                },250, "linear", function(){
                    ul.removeChild(li);
                });
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
            });

            if(entryValue.done){
                li.classList.add('task-completed');
            }

            function formatDate() {
                let d = new Date(),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            }

            if(entryValue.date < formatDate()) {
                li.classList.add('task-missed');
                this.entries[entryIndex].missed = true;
                this.saveLocal();
            } else {
                li.classList.remove('task-missed');
                this.entries[entryIndex].missed = false;
                this.saveLocal();
            }

            doneButton.addEventListener('click', ()=>{
                if(entryValue.done && this.entries[entryIndex].missed){
                    $(li).animate({
                        backgroundColor: "indianred"
                    },1000, "linear", function(){
                        li.classList.remove('task-completed');
                    });
                    this.entries[entryIndex].done = false;
                    this.saveLocal();
                }
                else if(entryValue.done){
                    $(li).animate({
                        backgroundColor: "#fff"
                    },1000, "linear", function(){
                        li.classList.remove('task-completed');
                    });
                    this.entries[entryIndex].done = false;
                    this.saveLocal();

                }else{
                    $(li).animate({
                        backgroundColor: "#90EE90",
                    }, 1000, "linear", function () {
                        li.classList.add('task-completed');
                    });
                    this.entries[entryIndex].done = true;
                    this.saveLocal();
                }
            });

            div.addEventListener("click", ()=> {
                if (this.entries[entryIndex].important && this.entries[entryIndex].done) {
                    li.style.backgroundColor = "lightgreen";
                    this.entries[entryIndex].important = false;
                    this.saveLocal();
                }
                else if(this.entries[entryIndex].important && this.entries[entryIndex].missed){
                        li.style.backgroundColor = "indianred";
                    this.entries[entryIndex].important = false;
                }
                else if(this.entries[entryIndex].important){
                    li.style.backgroundColor = "initial";
                    this.entries[entryIndex].important = false;
                } else {
                    li.style.backgroundColor = "rgb(213,213,46)";
                    this.entries[entryIndex].important = true;
                }
            });

            doneButton.appendChild(doneIcon);
            removeButton.appendChild(removeIcon);
            li.appendChild(div);
            li.appendChild(doneButton);
            li.appendChild(removeButton);
            ul.appendChild(li)

        });

        $("#sort").change(function(){
            let elems = $.makeArray($(".entry"));

            if(this.value === "dateIncrease"){
                elems.sort(function(a,b){
                    return Date.parse($(".entry-value #date", a).text()) > Date.parse($(".entry-value #date", b).text()) ? 1 : -1;
                })
            }

            if(this.value === "dateDecrease") {
                elems.sort(function(a,b){
                    return Date.parse($(".entry-value #date", b).text()) > Date.parse($(".entry-value #date", a).text()) ? 1 : -1;
                })
            }

            $(".todo-list").empty().append(elems);
        });


        $("#sort").change(function(){
            let titleArray = $.makeArray($(".entry"));

            if(this.value === "titleIncrease") {
                titleArray.sort(function (a, b) {
                    return ($(b).text()) < ($(a).text()) ? 1 : -1;
                });
            } else {
                if(this.value === "titleDecrease") {
                    titleArray.sort(function (a, b) {
                        return ($(b).text()) > ($(a).text()) ? 1 : -1;
                    });
                }
            }

            $(".todo-list").empty().append(titleArray)
        });



        document.body.appendChild(ul);
        
    }

    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
    }
}
const todo = new Todo();