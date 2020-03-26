class Todo {
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

const todos = [];
const url = 'https://httpbin.org/post';

// Funktsioon kutsutakse esile faili laadides
loadEntries();

function loadEntries() {

}

function addEntry() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const date = document.getElementById('date').value;


}

const data = {
    title: 'test',
    desc: 'ladida',
};
  
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        /*
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        */
        body: '?save=' + data,
       
    });
    return await response;
}
  
postData(url, data).then((result) => console.log(result));