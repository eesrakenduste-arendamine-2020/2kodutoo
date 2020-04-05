class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
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

        console.log(this.entries);
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
            const importantButton = document.createElement('div');
            importantButton.className = "important-button";
            const importantIcon = document.createTextNode('★')


            div.innerHTML = `<div id = "title">${entryValue.title}</div><div> ${entryValue.description}</div>
            <div id = "date">${entryValue.date}</div>`;

            removeButton.addEventListener('click', ()=>{
                $(li).animate({
                    opacity:".0"
                },1000, "linear", function(){
                    ul.removeChild(li);
                    // this.render();
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
                this.saveLocal();
            } else {
                li.classList.remove('task-missed');
                this.saveLocal();
            }

            doneButton.addEventListener('click', (keyframes, options)=>{
                if(entryValue.done){
                    $(li).animate({
                        backgroundColor: "#fff"
                    },100, "linear", function(){
                        li.classList.remove('task-completed');
                    });

                    this.entries[entryIndex].done = false;
                    this.saveLocal();
                }else{
                    $(li).animate({
                        "background-color": "#90EE90"
                    }, 1000, "linear", function () {
                        li.classList.add('task-completed');
                    });
                    this.entries[entryIndex].done = true;
                    this.saveLocal();
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
            console.log(elems);
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