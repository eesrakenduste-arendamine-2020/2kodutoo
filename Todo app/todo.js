window.onload = function() {
  editPage.style.display = "none";
};

class Entry {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
  }
}

let count = 0;
let countContainer = document.querySelector("#count");

const clear = document.querySelector(".clear");

clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
  title.value = "";
  description.value = "";
});

class Todo {
  constructor() {
    //$('#entries').on('click', '#editLink', setCurrent)
    //$("#submitEdit").on("click", editTask);
    //$("#submitEdit").on("click", setCurrent);
    this.entries = JSON.parse(window.localStorage.getItem("entries")) || [];
    document.querySelector("#save").addEventListener("click", () => {
      this.addEntry();
      this.saveToFile();
    });
    document.querySelector("#submitEdit").addEventListener("click", () => {
      this.editTask();
      this.saveLocal();
      this.showTodos();
    });

    this.render();
  }

  saveToFile() {
    $.post("server.php", { save: this.entries })
      .done(function() {
        //alert("Success");
      })
      .fail(function() {
        alert("FAIL");
      });
  }

  addEntry() {
    const title = $("#title").val();
    const description = $("#description").val();
    const date = $("#date").val();

    let todo = {
      title: title,
      description: description,
      date: date
    };
    this.entries.push(todo);
    count++;

    console.log(this.entries);
    this.saveLocal();
    this.render();
  }

  render() {
    countContainer.innerHTML = "You have " + count + " task(s) left to do.";
    if (document.querySelector(".todo-list")) {
      document.body.removeChild(document.querySelector(".todo-list"));
    }
    const ul = document.createElement("ul");
    ul.className = "todo-list";

    this.entries.forEach((entryValue, entryIndex) => {
      const li = document.createElement("li");
      li.classList.add("entry");
      const div = document.createElement("div");
      div.classList.add("entry-value");
      const removeButton = document.createElement("div");
      removeButton.className = "delete-button";
      const removeIcon = document.createTextNode("X");
      const editButton = document.createElement("div");
      editButton.className = "edit-button";
      const editIcon = document.createTextNode("EDIT");

      div.innerHTML = `<div>${entryValue.title}</div><div> ${entryValue.description}</div>
            <div>${entryValue.date}</div>`;

      removeButton.addEventListener("click", () => {
        count = count - 1;
        ul.removeChild(li);
        this.entries.splice(entryIndex, 1);
        this.saveLocal();
        this.render();

        //this.setCurrent();
        //this.showTodos();
      });

      editButton.addEventListener("click", () => {
        //editButton.addEventListener('click', () => this.edit(input, name));
        editPage.style.display = "block";
        //this.entries.splice(entryIndex, 1);
        // this.setCurrent();
        //this.editTask();
        this.render();
      });

      if (entryValue.done) {
        li.classList.add("task-completed");
      }

      div.addEventListener("click", () => {
        if (entryValue.done) {
          li.classList.remove("task-completed");
          this.entries[entryIndex].done = false;
          this.saveLocal();
          this.saveToFile();
        } else {
          li.classList.add("task-completed");
          this.entries[entryIndex].done = true;
          this.saveLocal();
          this.saveToFile();
        }
      });
      editButton.appendChild(editIcon);
      li.appendChild(div);
      li.appendChild(editButton);
      ul.appendChild(li);

      removeButton.appendChild(removeIcon);
      li.appendChild(div);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
  }

  /*edit(input, entryIndex){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = entries.indexOf(entryIndex);
            entries[indexof] = input.value;
            this.saveLocal();
        }
    }*/

  saveLocal() {
    window.localStorage.setItem("entries", JSON.stringify(this.entries));
  }

  showTodos() {
    this.entries = getEntryObject();

    if (this.entries != "" && this.entries != null) {
      for (let entryIndex = 0; entryIndex < this.entries.length; entryIndex++) {
        $("#this.entries").append(
          '<li class="ui-body-inherit ui-li-static">' +
            this.entries[entryIndex].title +
            "<br>" +
            this.entries[entryIndex].description +
            "<br>" +
            this.entries[entryIndex].date +
            '<div class="controls"><a href="#editPage" id="editLink" data-task="'
        );
      }
    }
  }
  setCurrent() {
    localStorage.setItem("currentTitle", $(this).data("title"));
    localStorage.setItem("currentDescription", $(this).data("description"));
    localStorage.setItem("currentDate", $(this).data("date"));

    $("#editTitle").val(localStorage.getItem("currentTitle"));
    $("#editDescription").val(localStorage.getItem("currentDescription"));
    $("#editDate").val(localStorage.getItem("currentDate"));
  }

  editTask() {
    let currentTitle = localStorage.getItem("currentTitle");
    let currentDescription = localStorage.getItem("currentDescription");
    let currentDate = localStorage.getItem("currentDate");

    entries = getEntryObject();

    for (let entryIndex = 0; entryIndex < this.entries.length; entryIndex++) {
      if (
        this.entries[entryIndex].title == currentTitle &&
        this.entries[entryIndex].date == currentDate &&
        this.entries[entryIndex].description == currentDescription
      ) {
        this.entries.splice(entryIndex, 1);
      }
      localStorage.setItem("entries", JSON.stringify(this.entries));
    }

    let title = $("#editTitle").val();
    let date = $("#editDate").val();
    let description = $("#editDescription").val();

    let update_todo = {
      title: title,
      description: description,
      date: date
    };

    this.entries.push(update_todo);

    this.saveLocal();
    this.render();
    alert("Ülesanne muudetud");

    localStorage.setItem("entries", JSON.stringify(this.entries));

    window.location.href = "todo.html";

    return false;
  }

  getEntryObject() {
    let currentEntries = localStorage.getItem("entries");

    if (currentEntries != null) {
      this.entries = JSON.parse(currentEntries);
    } else {
      this.entries = [];
    }

    return this.entries.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }
}

const todo = new Todo();
