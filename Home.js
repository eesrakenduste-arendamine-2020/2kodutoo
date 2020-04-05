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

var searchButton = document.querySelector('#searchInput');
class Todo {
  constructor() {
    this.entries = JSON.parse(window.localStorage.getItem("entries")) || [];
    document.querySelector("#addButton").addEventListener("click", () => {
      this.addEntry();
    });
    document.querySelector('#sortByTitle').addEventListener('click', ()=>{this.sortByTitle()});
    document.querySelector("#sortByDate").addEventListener("click", () => {this.sortByDate();});
    searchButton.addEventListener('keyup', ()=>{this.search()});

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

  search() {
    var firstChars, ul, li, a, i, txtValue;
    firstChars = searchButton.value.toLowerCase();
    ul = document.getElementsByClassName("todo-list");
    li = ul[0].getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(firstChars) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date1').value;

        if(titleValue && descriptionValue && dateValue){
            this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
            this.saveLocal();
            this.saveToFile();
            this.render();
            this.alertPositive();

            document.querySelector('#title').value = "";
            document.querySelector('#description').value = "";
            document.querySelector('#date1').value = "";
        } else {
            this.alertNegative();
        }
    }

    alertPositive() {
      var alert = document.createElement("div");
      alert.classList.add('alertPositive');
      var textnode = document.createTextNode("Uus todo ülesanne lisatud!");
      alert.appendChild(textnode);
    
      var list = document.getElementById("message");
      list.insertBefore(alert, list.childNodes[0]);
      alert.parentElement.style.display = 'block';
      setTimeout(function(){alert.parentElement.removeChild(alert);}, 2000);
    }

    alertNegative() {
      var alert = document.createElement("div");
      alert.classList.add('alertNegative');
      var textnode = document.createTextNode("Palun sisesta kõik väljad!");
      alert.appendChild(textnode);
    
      var list = document.getElementById("message");
      list.insertBefore(alert, list.childNodes[0]);
      alert.parentElement.style.display = 'block';
      setTimeout(function(){alert.parentElement.removeChild(alert)}, 2000);
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
        }).always(function(){
        });
      }


    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
    }


}

const todo = new Todo();
