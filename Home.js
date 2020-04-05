let d = new Date();
let day = d.getDay();
let month = d.getMonth();
let year = d.getFullYear();
let clockdate = d.getDate();
let dayContainer = document.querySelector("#weekday");
let time = document.querySelector("#time");
let yearContainer = document.querySelector("#year");
let monthContainer = document.querySelector("#month");
let dateContainer = document.querySelector("#clockdate");
let days = [
  "Pühapäev",
  "Esmaspäev",
  "Teisipäev",
  "Kolmapäev",
  "Neljapäev",
  "Reede",
  "Laupäev",
];
let months = [
  "Jaanuar",
  "Veebruar",
  "Märts",
  "Aprill",
  "Mai",
  "Juuni",
  "Juuli",
  "August",
  "September",
  "Oktoober",
  "November",
  "Detsember",
];
yearContainer.innerHTML = year;
monthContainer.innerHTML = months[month];
dayContainer.innerHTML = days[day];
dateContainer.innerHTML = clockdate;
updateClock();
window.setInterval(updateClock, 1000);
function updateClock() {
  d = new Date();
  let seconds = d.getSeconds();
  let minutes = d.getMinutes();
  let hours = d.getHours();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  time.innerHTML = hours + ":" + minutes + ":" + seconds;
}
class Entry {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
  }
}
class Todo {
  constructor() {
    this.entries = JSON.parse(window.localStorage.getItem("entries")) || [];
    document.querySelector("#addButton").addEventListener("click", () => {
      this.addEntry();
    });
    document.querySelector('#sortByTitle').addEventListener('click', ()=>{this.sortByTitle()});
    document.querySelector("#sortByDate").addEventListener("click", () => {
      this.sortByDate();
    });
    this.render();
  }
  sortByTitle() {

      this.entries.sort(function (a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
    ;

    this.saveLocal();
    this.render();
  }
  sortByDate() {

      this.entries.sort(function (a, b) {
        var x = a.date;
        var y = b.date;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });

    this.saveLocal();
    this.render();
  }
  addEntry() {
    const titleValue = document.querySelector("#title").value;
    const descriptionValue = document.querySelector("#description").value;
    const dateValue = document.querySelector("#date1").value;
    console.log(titleValue, descriptionValue, dateValue);
    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    console.log(this.entries);
    this.saveLocal();
    this.render();
  }
  render() {
    if (document.querySelector(".todo-list")) {
      document.body.removeChild(document.querySelector(".todo-list"));
    }
<<<<<<< HEAD
    const ul = document.createElement("ul");
    ul.className = "todo-list";
    ul.setAttribute("id", "list");
    this.entries.forEach((entryValue, entryIndex) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const removeButton = document.createElement("div");
      removeButton.classList.add("delete-button");
      const removeIcon = document.createTextNode("X");
      li.classList.add("entry");
      removeButton.addEventListener("click", () => {
        ul.removeChild(li);
        this.entries.splice(entryIndex, 1);
        this.saveLocal();
        this.render();
      });
      if (entryValue.done) {
        li.classList.add("task-completed");
      }
      div.addEventListener("click", (event) => {
        event.target.classList.add("task-completed");
        this.entries[entryIndex].done = true;
        this.saveLocal();
      });
      div.innerHTML = `${entryValue.title} <br> ${entryValue.description} <br> ${entryValue.date}`;
      removeButton.appendChild(removeIcon);
      li.appendChild(div);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  }
  saveLocal() {
    window.localStorage.setItem("entries", JSON.stringify(this.entries));
    console.log("save");
  }
=======

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date1').value;

        console.log(titleValue, descriptionValue, dateValue);

        if(titleValue && descriptionValue && dateValue){
            this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

            console.log(this.entries);
            this.saveLocal();
            this.saveToFile();
            this.render();
            alert("ülesanne lisatud! Kui ülesanne on tehtud, kliki selle peale.");

            document.querySelector('#title').value = "";
            document.querySelector('#description').value = "";
            document.querySelector('#date1').value = "";
        } else {
            alert("Kõik väljad ei ole täidetud! Ülesannet lisada ei saa.")
        }
    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));
        }

        const ul = document.createElement('ul');
        ul.className = 'todo-list';
        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            const div = document.createElement('div');
            const removeButton = document.createElement('div');
            removeButton.classList.add('delete-button');
            const removeIcon = document.createElement('i');
            removeIcon.classList.add('fas');
            removeIcon.classList.add('fa-trash-alt');
            li.classList.add('entry');
            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
                this.render();
            });

            if(entryValue.done){
                li.classList.add('task-completed');
            }

            div.addEventListener('click', (event)=>{
                event.target.classList.add('task-completed');
                this.entries[entryIndex].done = true;
                this.saveLocal();
                setTimeout(function(){window.location.reload(1);}, 2000);
            });

            div.innerHTML = `${entryValue.title} <br> ${entryValue.description} <br> ${entryValue.date}`;

            removeButton.appendChild(removeIcon);
            li.appendChild(div);
            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

     saveToFile(){
        $.post('server.php', {save: JSON.stringify(this.entries)}).done(function(){
        }).fail(function(){
          alert('fail');
        }).always(function(){
        });
      }


    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
        console.log('save');
    }

>>>>>>> 3c17f685e8267e0f0f8835b89aa809a511f2b425
}
/*function sortList() {	
    var list, i, switching, b, shouldSwitch;	
    list = document.getElementById('list');	
    switching = true;	
    // Make a loop that will continue until	
    //no switching has been done: 	
    while (switching) {	
        // Start by saying: no switching is done:	
        switching = false;	
        b = list.getElementsByTagName('li');	
        // Loop through all list items:	
        for (i = 0; i < (b.length - 1); i++) {	
            // Start by saying there should be no switching:	
            shouldSwitch = false;	
            // Check if the next item should	
           // switch place with the current item: 	
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {	
                // If next item is alphabetically lower than current item,	
               // mark as a switch and break the loop: 	
                shouldSwitch = true;	
                break;	
            }	
        }	
        if (shouldSwitch) {	
            // If a switch has been marked, make the switch	
           // and mark the switch as done: 
            b[i].parentNode.insertBefore(b[i + 1], b[i]);	
            switching = true;	
        }	
    }	
}	*/
const todo = new Todo();
