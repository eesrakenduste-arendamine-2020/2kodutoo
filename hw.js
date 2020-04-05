class Entry{
    constructor(title, description, date, important){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
        this.importance = important;
        
        
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
        
        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
        //$('#addButton').click(function(){$('.entry').fadeIn(2000);});
        
        const importanceValue = this.checkIfImportant();
        console.log(importanceValue);

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue, importanceValue));
       
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
            $('.Entry').hide();
            $('.entry').fadeToggle(2000);
           
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
    checkIfImportant(){
        var checkBox = document.querySelector("#Cbox").checked;
        console.log(checkBox)
        var important = "";
        if(checkBox == true){
            important = "yes";
        } else {
            important = "no";
        }
        return important;
    }
   
    changeSortValue(sortValue){    
        let sortedByDate = sortValue;    
        if(sortValue == "date"){
            this.sortedByDate();
        } else if(sortValue == "name"){
            this.sortedByName();
        } else if(sortValue == "important"){
            this.sortedByImportance();            
        } else if(sortValue == "unimportant"){
            this.sortedUnimportant();
        } else if(sortValue == "blank"){
            this.sortedToBasic();
        }
    }

    sortedByDate(){
        function compareDate(a, b){
            const date1 = a.date;
            const date2 = b.date;
            let comparison = 0;
            if(date1 > date2){
                comparison = 1;
            } else if(date1 < date2){
                comparison = -1;
            }
            return comparison;
        }

        this.entries.sort(compareDate);
        this.render();

    }

    sortedByName(){
        function compareName(a,b){
            const title1 = a.title.toLowerCase();
            const title2 = b.title.toLowerCase();
            let comparison = 0;
            if(title1 > title2){
                comparison = 1;
            } else if(title1 < title2){
                comparison = -1;
            }
            return comparison;
        }
        this.entries.sort(compareName);
        this.render();
    }

    sortedByImportance(){

    }

    sortedUnimportant(){

    }

    sortedToBasic(){

    }

}



const todo = new Todo();
document.body.style.backgroundImage = "url('marble.jpg')"; 

$('.delete-button').click(function(){$('.entry').fadeOut(1000);});
