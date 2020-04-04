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
        //const importanceValue = document.querySelector("#Cbox").value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue ));
       
        console.log(this.entries);
        this.saveLocal();

        this.render();
        
    }

    render(){
        let sortValue = document.querySelector('#sortBy').value;
        document.querySelector("#clickSort").addEventListener("click", ()=>{
            sortValue = document.querySelector('#sortBy').value;
            this.changeSortValue(sortValue);
        });
        


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


    //document.querySelector('#sort').addEventListener('click', ()=>{this.sortBy();});
    
   
    changeSortValue(sortValue){    
        let sortedByDate = sortValue;    
        if(sortValue == "date"){
            this.sortedByDate();
        } else if(sortValue == "name"){
            sortedByName();
        } else if(sortValue == "important"){
            this.sortedByImportance();            
        } else if(sortValue == "unimportant" || sortValue == "blank"){
            this.sortedToBasic();
        }
    }

    sortedByDate(){
        function compare(a, b){
            const ab = a.date;
            const ba = b.date;
            let comparison;
            if(ab > ba){
                comparison = 1;
            } else if(ab < ba){
                comparison = -1;
            }
            return comparison;
        }

        this.entries.sort(compare);

    }

    sortedByName(){

    }

    sortedByImportance(){

    }

}


const todo = new Todo();
document.body.style.backgroundImage = "url('marble.jpg')"; 
