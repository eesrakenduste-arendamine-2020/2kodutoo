let time = document.querySelector("#time");
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
    time.innerHTML = hours + ":" + minutes;
  }
  

$(document).ready(function () {
    var i = 0;    
    for (i = 0; i < localStorage.length; i++) {
        var taskID = "task :" + i;
        $('#taskList').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "<i class='fa fa-trash'></i></li>");
    }
    $('#clear').click(function () {
        localStorage.clear();
    });
    


    $('#taskSisse').submit(function () {
        if ($('#taskInput').val() !== "") {
            var taskID = "task :" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskID, taskMessage);
            $('#taskList').append("<li class='task' id='" + taskID + "'>" + taskMessage + "<i class='fa fa-trash'></i></li>");
            var task = $('#' + taskID);            
            task.slideDown();
            $('#taskInput').val("");
            i++;
        }
        return false;
    });

    $('#taskList').on("click", "li", function (event) {
        self = $(this);
        taskID = self.attr('id');
        localStorage.removeItem(taskID);
        self.slideUp('slow', function () {
            self.remove();
        });

    });


});
