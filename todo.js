console.log('Fail ühendatud');

class Entry {
  constructor(title, description, category, date) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.date = date;
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
   
    this.entries.push(
      new Entry(titleValue, descriptionValue, categoryValue, dateValue)
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

      li.addEventListener('click', (event) => {
        event.target.classList.add('task-done');
        this.entries[entryIndex].done = true;
        this.saveLocal(this.entries);
      });

      li.innerHTML = `${entryValue.title} <br> ${entryValue.description} <br>${entryValue.category} <br> ${entryValue.date}`;
      removeButton.appendChild(removeIcon);
      li.appendChild(removeButton);
      ul.appendChild(li);
    });

    document.body.appendChild(ul);
  }

  saveLocal(entries) {
    window.localStorage.setItem('entries', JSON.stringify(entries));
    console.log('save'); 
  } 
  /**
   * Otsi pealkirja järgi
   */
  searchTodos = (event) => {
    const searchTerm = event.target.value;
    const searchResults = this.entries.filter(
      (todo) =>
        todo.title.includes(searchTerm) || todo.description.includes(searchTerm)
    );
    this.render(searchResults);
  };
}


const todo = new ToDo();
