$(document).one('pageinit', function(){
    let todos;
    showTodos();
  
    $('#submitAdd').on('tap', addTask);
    $('#todos').on('tap', '#editLink', setCurrent);
    $('#submitEdit').on('tap', editTask);
    $('#todos').on('tap', '#deleteLink', deleteTask);
    $('.date').each(function(){
      $(this).datepicker();
    });
  
    function deleteTask(){
      localStorage.setItem('currentTask', $(this).data('task'));
      localStorage.setItem('currentDate', $(this).data('date'));
  
      let currentTask = localStorage.getItem('currentTask');
      let currentDate = localStorage.getItem('currentDate');
  
      todos = getTodoObject();
  
      for(let i=0; i< todos.length; i++){
        if(todos[i].task == currentTask && todos[i].date == currentDate){
          todos.splice(i, 1);
        }
        localStorage.setItem('todos', JSON.stringify(todos));
      }
  
      
      window.location.href = "index.html";
  
    }
  
  
    function setCurrent(){
      localStorage.setItem('currentTask', $(this).data('task'));
      localStorage.setItem('currentDate', $(this).data('date'));
  
      $('#editTask').val(localStorage.getItem('currentTask'));
      $('#editDate').val(localStorage.getItem('currentDate'));
    }
  
    function editTask(){
      let currentTask = localStorage.getItem('currentTask');
      let currentDate = localStorage.getItem('currentDate');
  
      todos = getTodoObject();
  
      for(let i=0; i< todos.length; i++){
        if(todos[i].task == currentTask && todos[i].date == currentDate){
          todos.splice(i, 1);
        }
        localStorage.setItem('todos', JSON.stringify(todos));
      }
  
      let task = $('#editTask').val();
      let date = $('#editDate').val();
  
      let update_todo = {
        task: task,
        date: date
      };
  
      todos.push(update_todo);
  
      alert("Ülesanne muudetud");
  
      localStorage.setItem('todos', JSON.stringify(todos));
  
      window.location.href = "index.html";
  
      return false;
    }
  
    function addTask(){
      let task = $('#addTask').val();
      let date = $('#addDate').val();
  
      let todo = {
        task: task,
        date: date
      };
  
      todos = getTodoObject();
  
      todos.push(todo);
  
      localStorage.setItem('todos', JSON.stringify(todos));
  
      window.location.href="index.html";
  
      return false;
    }
  
    function getTodoObject(){
      let currentTodos = localStorage.getItem('todos');
  
      if(currentTodos != null){
        todos = JSON.parse(currentTodos);
      } else{
        todos = [];
      }
  
      return todos.sort(function(a, b){
        return new Date(b.date) - new Date(a.date);
      });
  
    }
  
    function showTodos(){
      todos = getTodoObject();
  
      if(todos != "" && todos != null){
        for(let i = 0; i < todos.length; i++){
          $('#todos').append('<li class="ui-body-inherit ui-li-static">'+ todos[i].task+ '<br>'+ todos[i].date +'<div class="controls"><a href="#edit" id="editLink" data-task="'+todos[i].task + '" data-date="' + todos[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="'+todos[i].task + '" data-date="' + todos[i].date + '" onclick="return confirm(\'Kas oled kindel, et tahad ülesannet kustutada?\')">Kustuta</a></div></li>');
        }
      }
  
      $('#home').on('pageinit', function(){
        $('#todos').listview('refresh');
      });
    }
  
  });
  