console.log('Fail ühendatud');

class Entry {
  constructor(title, description, category, date, important) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.date = date;
    this.important = important || false;
    this.done = false;
  }
}

class ToDo {
  constructor() {
    console.log('ToDo sees');

    document.querySelector('#addButton').addEventListener('click', () => {
      this.addEntry();
    });
    document
      .querySelector('#sortByTitleButton')
      .addEventListener('click', () => {
        this.sortByTitleEntry();
      });
    document
      .querySelector('#sortByDateButton')
      .addEventListener('click', () => {
        this.sortByDateEntry();
      });

    document
      .querySelector('#sortByImportance')
      .addEventListener('click', () => {
        this.filterImportantTasks();
      });

    document
      .getElementById('clearFiltersButton')
      .addEventListener('click', () => {
        this.clearAllFilters();
      });

   
    document
      .querySelector('#search')
      .addEventListener('input', this.searchTodos);

    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

    this.render(this.entries);
  }

  addEntry() {
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const categoryValue = document.querySelector('#category').value;
    const dateValue = document.querySelector('#date').value;
    const importantValue = this.markedAsImportant();

    this.entries.push(
      new Entry(
        titleValue,
        descriptionValue,
        categoryValue,
        dateValue,
        importantValue
      )
    );
    this.saveLocal(this.entries);
    this.render(this.entries);
  }

  sortByTitleEntry() {
    const sortedResults = this.entries.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    this.render(sortedResults);
  }

  sortByDateEntry() {
    const sortedResults = this.entries.sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    this.render(sortedResults);
  }

  filterImportantTasks = () => {
    this.render(this.entries.filter(e => e.important));
  };

  clearAllFilters = () => {
    // Andmebaasiga ühendus
    const entries = JSON.parse(localStorage.getItem('entries'));
    this.render(entries);
  };

  markedAsImportant() {
    var checkBox = document.getElementById('important');
    if (checkBox.checked == true) {
      return true;
    } else {
      return false;
    }
  }

  render(items) {
    if (document.querySelector('.todo-list')) {
      document.body.removeChild(document.querySelector('.todo-list'));
    }

    const ul = document.createElement('ul');
    ul.className = 'todo-list';

    items.forEach((entryValue, entryIndex) => {
      const li = document.createElement('li');
      const removeButton = document.createElement('div');
      const removeIcon = document.createTextNode('X');
      li.classList.add('entry');

      removeButton.addEventListener('click', () => {
        ul.removeChild(li);
        this.entries.splice(entryIndex, 1);
        this.saveLocal(this.entries);
        this.render(this.entries);
      });

      if (entryValue.done) {
        li.classList.add('task-done');
      }

      li.addEventListener('click', event => {
        event.target.classList.add('task-done');
        this.entries[entryIndex].done = true;
        this.saveLocal(this.entries);
      });

      li.innerHTML = `${entryValue.title} <br> ${entryValue.description} <br>${entryValue.category} <br> ${entryValue.date}`;

      if (entryValue.important == 'yes') {
        li.classList.add('important');
      }
      removeButton.appendChild(removeIcon);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
  }

  saveData() {
    $.post('server.php', { save: JSON.stringify(this.entries) })
      .done(function () {})
      .fail(function () {})
      .always(function () {});
    saveLocal(this.entries);
  }

  saveLocal(entries) {
    window.localStorage.setItem('entries', JSON.stringify(entries));
    console.log('save');
  }
  /**
   * Otsi pealkirja järgi
   */
  searchTodos = event => {
    const searchTerm = event.target.value;
    const searchResults = this.entries.filter(
      todo =>
        todo.title.includes(searchTerm) || todo.description.includes(searchTerm)
    );
    this.render(searchResults);
  };
}

const todo = new ToDo();
