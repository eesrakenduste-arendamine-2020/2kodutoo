window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


if (!window.indexedDB) {
  console.log("Your browser doesn't support IndexedDB.");
}

var db;
const dbName = "mydb";


// open our database
var request = indexedDB.open(dbName, 2);

//Looks like Webstorm never heard of IndexedDB.
request.onerror = function(event) {
  console.log(event.target.errorCode);
};


request.onsuccess = function(event) {
  db=event.target.result;
  $(".form").append('<p>IndexedDB initialised.</p>');
};

// When a database is initially created onupgradeneeded callback is fired where you can create an objectStore.
request.onupgradeneeded = function(event) {
//Call-> indexedDB.open() with dbName as name and version 1;
  var db = event.target.result;
  //create a new object store called tasks, set keyPath 'id' and auto increment.
  var taskStore = db.createObjectStore("tasks", {keyPath: '_id'},{autoIncrement:true});
  taskStore.createIndex("_taskDate", "_taskDate", { unique: false });
  taskStore.createIndex("_taskName", "_taskDone", { unique: false });
  taskStore.createIndex("_isDone", "_isDone", { unique: false });
  taskStore.createIndex("_isImportant", "_isImportant", { unique: false });
  var taskObjectStore = db.transaction(["tasks"], "readwrite").taskStore("tasks");
  taskArray.forEach(function(task) {
    taskObjectStore.add(task);
  });
};



