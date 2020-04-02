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
            const div = document.createElement('div');
            div.classList.add('entry-value')
            const removeButton = document.createElement('div');
            removeButton.className = "delete-button";
            const removeIcon = document.createTextNode('X');

            div.innerHTML = `<div>${entryValue.title}</div><div> ${entryValue.description}</div>
            <div>${entryValue.date}</div>`;

            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
                this.render();
            });

            if(entryValue.done){
                li.classList.add('task-completed');
            }

            div.addEventListener('click', ()=>{
                if(entryValue.done){
                    li.classList.remove('task-completed');
                    this.entries[entryIndex].done = false;
                    this.saveLocal();
                }else{
                    li.classList.add('task-completed');
                    this.entries[entryIndex].done = true;
                    this.saveLocal();
                }
            });

            removeButton.appendChild(removeIcon);
            li.appendChild(div);
            li.appendChild(removeButton);
            ul.appendChild(li);

        });

        document.body.appendChild(ul);
    }

    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
    }


    //document.querySelector('#sortBy').addEventListener('click', ()=>{this.sortBy();});

    sortBy(){
        var val = document.getElementById('#sortBy').value;
        if(val = "Date"){
            const sortedByDate = entries.slice().sort((a, b, c, d) => c.date);//sorteeri kp järgi     
            document.getElementById("#sortBy").innerHTML = sortedByDate;
        } //else {
            //sorteeri nime järgi
        //}
    }


const todo = new Todo();