class Entry {                                //hans robert noor
    constructor(game, score, date, search) { //hans robert noor
        this.game = game;                    //hans robert noor
        this.score = score;                  //hans robert noor
        this.date = date;                    //hans robert noor
        this.search = search;                //hans robert noor
        this.done = false;                   //hans robert noor
    }                                        //hans robert noor
}                                            //hans robert noor
                                             //hans robert noor
class ToDo {                                 //hans robert noor
    constructor() {                          //hans robert noor
        console.log('ToDo sees');            //hans robert noor
                                             //hans robert noor
        document.querySelector('#addButton').addEventListener('click', () => { this.addEntry() });                    //hans robert noor
        document.querySelector('#sortGameButton').addEventListener('click', () => { this.sortEntriesByGame() });      //hans robert noor
        document.querySelector('#sortScoreButton').addEventListener('click', () => { this.sortEntriesByScore() });    //hans robert noor
        document.querySelector('#sortDateButton').addEventListener('click', () => { this.sortEntriesByDate() });      //hans robert noor
        document.querySelector('#searchButton').addEventListener('click', () => { this.searchEntries()});             //hans robert noor
                                             //hans robert noor
                                             //hans robert noor
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];     //hans robert noor
                                             //hans robert noor
        this.render();                       //hans robert noor
    }                                        //hans robert noor
                                             //hans robert noor
    addEntry() {                             //hans robert noor
        const gameValue = document.querySelector('#game').value;            //hans robert noor
        const scoreValue = document.querySelector('#score').value;          //hans robert noor
        const dateValue = document.querySelector('#date').value;            //hans robert noor
                                             //hans robert noor
        this.entries.push(new Entry(gameValue, scoreValue, dateValue));     //hans robert noor
                                             //hans robert noor
        console.log(this.entries);           //hans robert noor
        this.saveLocal();                    //hans robert noor
        this.render();                       //hans robert noor
    }                                        //hans robert noor
                                             //hans robert noor
    sortEntriesByGame() {                    //hans robert noor
        this.entries.sort((a, b) => a.game.localeCompare(b.game));          //hans robert noor
        this.render();                       //hans robert noor
    }                                        //hans robert noor
    sortEntriesByDate() {                    //hans robert noor
        this.entries.sort((a, b) => a.date.localeCompare(b.date));          //hans robert noor
        this.render();                       //hans robert noor
    }                                        //hans robert noor
    sortEntriesByScore() {                   //hans robert noor
        this.entries.sort((a, b) => a.score.localeCompare(b.score));        //hans robert noor
        this.render();                       //hans robert noor
    }                                        //hans robert noor
    searchEntries(){                         //priit Sauer
        const searchText = document.querySelector('#search').value;                //priit Sauer
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];   //priit Sauer
        if(searchText.length > 0){                                                 //priit Sauer
            let current = this.entries.filter((item) =>                            //priit Sauer
                (item.game.indexOf(searchText) !== -1 || item.score.indexOf(searchText) !== -1)  //priit Sauer
            );                               //priit Sauer
            this.entries = current;          //priit Sauer
            this.render();                   //priit Sauer
        } else {                             //priit Sauer
            this.render();                   //priit Sauer
        }                                    //priit Sauer
    }                                        //priit Sauer
                                             //priit Sauer
    render() {                               //priit Sauer
        if (document.querySelector('.todo-list')) {                           //priit Sauer
            document.body.removeChild(document.querySelector('.todo-list'));  //priit Sauer
        }                                    //priit Sauer
                                             //priit Sauer
        const ul = document.createElement('ul');   //priit Sauer
        ul.className = 'todo-list';                //priit Sauer
                                                   //priit Sauer
                                                   //priit Sauer
        this.entries.forEach((entryValue, entryIndex) => {         //priit Sauer
            const li = document.createElement('li');               //priit Sauer
            const removeButton = document.createElement('div');    //priit Sauer
            const removeIcon = document.createTextNode('X');       //priit Sauer
            li.classList.add('entry');                             //priit Sauer
                                                                   //priit Sauer
            removeButton.addEventListener('click', () => {         //priit Sauer
                ul.removeChild(li);                                //priit Sauer
                this.entries.splice(entryIndex, 1);                //priit Sauer
                this.saveLocal();                                  //priit Sauer
                this.render();                                     //priit Sauer
            });                                                    //priit Sauer
                                                                   //priit Sauer
            if (entryValue.done) {                                 //priit Sauer
                li.classList.add('task-done');                     //priit Sauer
            }                                                      //priit Sauer
                                                                   //priit Sauer
            li.addEventListener('click', (event) => {              //priit Sauer
                event.target.classList.add('task-done');           //priit Sauer
                this.entries[entryIndex].done = true;              //priit Sauer
                this.saveLocal();                                  //priit Sauer
            });                                                    //priit Sauer
                                                                   //priit Sauer
            li.innerHTML = `${entryValue.game} <br> ${entryValue.score} <br> ${entryValue.date}`;  //priit Sauer
            removeButton.appendChild(removeIcon);                                                  //priit Sauer
            li.appendChild(removeButton);                                                          //priit Sauer
            ul.appendChild(li);                                                                    //priit Sauer
        });                                                                                        //priit Sauer
                                                                   //priit Sauer
        document.body.appendChild(ul);                             //priit Sauer
    }                                                              //priit Sauer
                                                                   //priit Sauer
    saveLocal() {                                                  //hans robert noor
        window.localStorage.setItem('entries', JSON.stringify(this.entries));   //hans robert noor
        console.log("save");                                                    //hans robert noor
    }                                                                           //hans robert noor
                                                                                //hans robert noor
                                                                                //hans robert noor
}                                                                               //hans robert noor
                                                                                //hans robert noor
const todo = new ToDo();                                                        //hans robert noor
