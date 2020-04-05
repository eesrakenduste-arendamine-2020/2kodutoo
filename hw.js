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
        this.render(this.entries);
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;
        const importanceValue = this.checkIfImportant();
        console.log(importanceValue);

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue, importanceValue));
       
        console.log(this.entries);
        this.saveLocal();

        this.render(this.entries);
        
    }

    render(array){
        let newArray = array;
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

        newArray.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            li.classList.add('entry');
            const div = document.createElement('div');
            div.classList.add('entry-value')
            const removeButton = document.createElement('div');
            removeButton.className = "delete-button";
            const removeIcon = document.createTextNode('X');

            var msMinute = 60*1000;
            var today = this.dateRightNow();
            console.log(today);
            console.log(entryValue.date);
            var daysLeft = today - 12;
            var daysLeftt = Math.floor((today-entryValue.date)/msMinute);
            console.log(daysLeft);
            if(daysLeft <= 2 && entryValue.done != true){
                document.querySelector(".entry-value").style.backgroundColor = "tomato"; 
            }
            div.innerHTML = `<div> ${entryValue.title}</div><div> ${entryValue.description}</div>
            <div>${entryValue.date}</div>`;

            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                newArray.splice(entryIndex, 1);
                this.saveLocal();
                this.render(newArray);
            });

            if(entryValue.done){
                li.classList.add('task-completed');
            }

            div.addEventListener('click', ()=>{
                if(entryValue.done){
                    li.classList.remove('task-completed');
                    newArray[entryIndex].done = false;
                    this.saveLocal();
                }else{
                    li.classList.add('task-completed');
                    newArray[entryIndex].done = true;
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
    dateRightNow(){
        let month = ((new Date()).getMonth()+1);
        let date = (new Date()).getDate();
        if(month < 10){
          month = "0" + month;
        }
        if(date < 10){
          date = "0" + date;
        }
        let today = (new Date()).getFullYear() + "-" + date + "-" + month;
        return today;
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
        } else if(sortValue == "notdone"){
            this.sortedNotDone();
        }
    }

    sortedNotDone(){
        var notDone = new Array();
        for(let i=0; i < this.entries.length; i++){
            let entry = this.entries[i];
            if(entry.done != true){
                notDone.push(entry);
            }
        }
        this.render(notDone);
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
        var sortDate = this.entries.concat();
        sortDate.sort(compareDate);
        this.render(sortDate);

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
        var sortName = this.entries.concat();
        sortName.sort(compareName);
        this.render(sortName);
    }

    sortedByImportance(){
        let important = new Array();
        for(let i=0; i < this.entries.length; i++){
            let entry = this.entries[i];
            if(entry.importance != "no"){
                important.push(entry);
            }
        }
        this.render(important);
    }

    sortedUnimportant(){
        let uniImportant = new Array();
        for(let i=0; i < this.entries.length; i++){
            let entry = this.entries[i];
            if(entry.importance != "yes"){
                uniImportant.push(entry);
            }
        }
        this.render(uniImportant);

    }

    sortedToBasic(){
        this.render(this.entries);
    }

}



const todo = new Todo();
document.body.style.backgroundImage = "url('marble.jpg')"; 
