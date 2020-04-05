console.log("fail õigesti ühendatud.");

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

    document.querySelector("#sort").addEventListener("change", () => {
      this.sortFunction();
    });

    document.querySelector(".searchform").addEventListener("keyup", () => {
      this.searchFunction();
    });

    this.render();
  }

  addEntry() {
    const titleValue = document.querySelector("#title").value;
    const descriptionValue = document.querySelector("#description").value;
    const dateValue = document.querySelector("#date").value;

    console.log(titleValue, descriptionValue, dateValue);

    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

    console.log(this.entries);
    this.saveLocal();

    this.render();
  }

  sortFunction() {
    const sortbutton = document.getElementById("sort");
    var selected = sortbutton.value;
    console.log(selected);
    if (selected == "2") {
      this.entries.sort((a, b) => a.title.localeCompare(b.title));
      this.render();
    } else if (selected == "1") {
      this.entries.sort((a, b) => a.date.localeCompare(b.date));
      this.render();
    }
  }

  searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("todo");
    li = ul.getElementsByTagName("li");
    console.log(li);

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  render() {
    if (document.querySelector(".todo-list")) {
      document.body.removeChild(document.querySelector(".todo-list"));
    }
    const ul = document.createElement("ul");
    ul.className = "todo-list";
    ul.id = "todo";
    this.entries.forEach((entryValue, entryIndex) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const removeButton = document.createElement("div");
      removeButton.classList.add("delete-button");
      const removeIcon = document.createTextNode("X");
      //var del = $("<i class='fas fa-trash-alt'></i>").click(function();
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

      li.addEventListener("click", (event) => {
        event.target.classList.add("task-completed");
        this.entries[entryIndex].done = true;
        this.saveLocal();
      });

      div.innerHTML = `<a href=""> <b> ${entryValue.title} </b> <br> ${entryValue.description} <br> ${entryValue.date} </a>`;

      removeButton.appendChild(removeIcon);
      li.appendChild(div);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
    $("#todo").hide().fadeIn(1500);
  }

  saveLocal() {
    window.localStorage.setItem("entries", JSON.stringify(this.entries));
    console.log("save");
  }
}
const todo = new Todo();
