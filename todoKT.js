const listsContainer = document.querySelector('[all-lists]') //listide text container
const newListForm = document.querySelector('[create-new-list-form]') //nüüd saab js kasutada eventlistenere ja luua uue listi 
const newListInput = document.querySelector('[new-list-input]') //nüüd saab js kasutada eventlistenere
const deleteListBtn = document.querySelector('[delete-list-btn]')//nüüd saab js kasutada eventlistenere 
const listDisplayContainer = document.querySelector('[on-display-list-container]')//listide tegevused
const listTitleElement = document.querySelector('[list-title-container]')//task name
const listCountElement = document.querySelector('[list-count-container]')//tegevuse lugeja
const tasksContainer = document.querySelector('[all-tasks]')//eventListeneri jaoks
const taskTemplate = document.getElementById('task-template')//tuleneb html failist
const newTaskForm = document.querySelector('[create-new-task-form]')//eventListeneri jaoks
const newTaskInput = document.querySelector('[new-task-input]')//eventListeneri jaoks
const deleteCompleteTasksBtn = document.querySelector('[clear-complete-tasks-btn]')//eventListeneri jaoks
const listsUl = document.querySelector('#listidUl') //Listide ul
const searchListBar = document.forms['searchList'].querySelector('input') //eventListeneri jaoks


searchListBar.addEventListener('keyup', e =>{ //kui nupp on pressitud, siis toimub funktsioon
  const term = e.target.value.toLowerCase(); //kõik mis on search baris tehakse lower case
  const listidUlis = listsUl.getElementsByTagName('li'); //uus konstant array´i jaoks
  Array.from(listidUlis).forEach(function(list){ //Listidest tehakse array ja nendele on kasutatud funktsioon
    const valueseesList = list.firstChild.textContent; //uus konstant 
    if(valueseesList.toLowerCase().indexOf(term) != -1){  //Kui sisestatud tekst search baris on sarnane li´ga siis seda näidetakse, ülejäänud kustutakse
      list.style.display = 'block';
    } else {
      list.style.display = 'none';
    }
  })
})

const LOCAL_STORAGE_LIST_KEY = 'task.lists'//tasks.lists tagab selle et listide key ei saaks üle kirjtuada
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'//põhimõte jääb samaks mis rida üleval pool, lihtsalt erinev

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] //muutuja mis hoiab liste, võta info localstorage, kasutades list_key ja kui eksisteerib siis tee ta objektiks
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)//valime localstorage id et saaks liste valida veebilehel

listsContainer.addEventListener('click', e => {//kui klikime listcontainer siis, kasutame click event listeneri kui on "li" element
  if (e.target.tagName.toLowerCase() === 'li') {//klikime list elemendile "li"
    selectedListId = e.target.dataset.listId//võtame listId mis on funktsioonis renderLists
    saveRender()//saveb ja renderib ilma refreshita
  }
})

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {//kui vajutame et töö tehtud
    const selectedList = lists.find(list => list.id === selectedListId)//võtame selle sama listi
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)//võtame selle sama listi koos ülesannetega
    selectedTask.complete = e.target.checked
    save()
    renderTaskCount(selectedList)
  }
})

newListForm.addEventListener('submit', e => {
  e.preventDefault()//sellega takistab lehte refreshimast kui "enter" vajutada
  const listName = newListInput.value//võtame nime mis kirjutatakse "Loo uus list"
  if (listName == null || listName === '') return//kui ei kirjutata midagi siis return
  const list = createList(listName)//kui sisetatakse list siis kasutatakse uut funkts
  newListInput.value = null//kui lisatakse list siis tuleb blank input
  lists.push(list)//listi nimi lükatakse listi
  saveRender()
})


newTaskForm.addEventListener('submit', e => {
  e.preventDefault()
  const taskName = newTaskInput.value
  if (taskName == null || taskName === '') return
  const task = createTask(taskName)
  newTaskInput.value = null
  const selectedList = lists.find(list => list.id === selectedListId)//list mis on valitud
  selectedList.tasks.push(task)//võtab valitud listi, koos ülesannetega ja lisab listi mille just tegime
  saveRender()
})


deleteListBtn.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)//annab kõik listid, mis pole valitud veebilehel ja paneb uude listi
  selectedListId = null //valitud listi kustutab ära
  saveRender()
})

deleteCompleteTasksBtn.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveRender()
})

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }//teeme id unikaalseks lisades praeguse aja ja teeme stringiks
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false }//complete false sest lisades ülesande peab see olema tegemata
}

function saveRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))//salvestame info localstorage, et info ei kaoks kui refresh page
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)//kui list valitud siis refresh page jääb meelde mis list valitud
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)//true võtab kõik mis on template (div) sees, ilma selleta renderib div class "task"
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
  })
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length//leiame kõik ülesanded mis tegemata kasutades "!"
  const taskString = incompleteTaskCount === 1 ? "ülesanne":"ülesannet"//mitmuses või mitte, peale semikoolonit tuleb see mis False, enne seda tuleb True
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} jäänud`
}

function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id //kui klikime listi peal siis teame millega tegemist on, sest kasutame listId
    listElement.classList.add("list-name")
    listElement.innerText = list.name //paneme list.name sest ilma .name oleks tegemist objectga
    if (list.id === selectedListId) {//kasutame selected_list_id
      listElement.classList.add('active-list')
    }
    listsContainer.appendChild(listElement)
  })
}

function render() {
  clearElement(listsContainer) //tühejndame elemendi listsContainerist
  renderLists()

  const selectedList = lists.find(list => list.id === selectedListId)//selleks et tuua välja listi nimi koos tegevustega
  if (selectedListId == null) {//kui list pole valitud
    listDisplayContainer.style.display = 'none'//siis ei näita ka listi sisu
  } else { 
    listDisplayContainer.style.display = ''//kui on list valitud siis peaks ka listi sisu tagasi tooma
    listTitleElement.innerText = selectedList.name //selleks et tuua välja listi nimi koos tegevustega
    renderTaskCount(selectedList)//võtame listi mis on valitud
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()