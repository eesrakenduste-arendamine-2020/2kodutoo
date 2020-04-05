$("#add").click(addEntry);
$("#sortAdded").click(sortAdded);
$("#sortAsc").click(sortAsc);
$("#sortDesc").click(sortDesc);
$("#sortdateasc").click(sortDateAsc);
$("#sortdatedesc").click(sortDateDesc);

document.getElementById('date').valueAsDate = new Date();
window.onload = readTodos();

function addEntry() {
    const titleValue = $('#title').val();
    const importantValue = $("input[name='important']:checked").val();
    var date = $('#date').val();
    if (titleValue.length == 0) {
        alert("Fill the title field!");
    } else {
        $.get("ajax.php?title="+titleValue+"&radio="+importantValue+"&date="+date+"&addtodo", function(data) {
            $("#content").html(data);
        });
        $('#title').val(''); 
    }
}

function readTodos() {
    $.get("ajax.php", function(data) {
        $("#content").html(data);
    });
}

function markCompleted() {
    let id = $(this).attr("data-id");
    let sort = '&' + $(this).attr("data-sort");

  $.get("ajax.php?id="+id+sort, function (data) {
    $("#content").html(data);
  });
}

function deleteTodo() {
    let deleted = $(this).attr("data-delete");
    let sort = '&' + $(this).attr("data-sort");

  $.get("ajax.php?deleted="+deleted+sort, function (data) {
    $("#content").html(data);
  });
}

function sortAdded() {
    $.get("ajax.php", function (data) {
        $("#content").html(data);
    });
}

function sortAsc() {
    $.get("ajax.php?sortasc", function (data) {
        $("#content").html(data);
    });
}

function sortDesc() {
    $.get("ajax.php?sortdesc", function (data) {
        $("#content").html(data);
    });
}

function sortDateAsc() {
    $.get("ajax.php?sortdateasc", function (data) {
        $("#content").html(data);
    });
}

function sortDateDesc() {
    $.get("ajax.php?sortdatedesc", function (data) {
        $("#content").html(data);
    });
}



