$(document).ready(function() {



    // Add-new button css
    $(document).on('mouseenter', '.add-new-text', function() {;
        $('.plus').css('color', '#67b8ff');
    });

    $(document).on('mouseleave', '.add-new-text', function() {
        $('.plus').css('color', '#2699fb');
    });

    $(document).on('mouseenter', '.plus', function() {;
        $('.plus').css('color', '#67b8ff');
    });

    $(document).on('mouseleave', '.plus', function() {
        $('.plus').css('color', '#2699fb');
    });

    // Create new modal css
    $(document).on('click', '.plus', function() {
        $('.addNewTaskModal').css('display', 'flex');
    });

    $(document).on('click', '.add-new-text', function() {
        $('.addNewTaskModal').css('display', 'flex');
    });

    $(document).on('click', '.dialogBox__closeIcon', function() {
        $('.addNewTaskModal').hide();
    });

    // Modal importance box css
    $(document).on('click', '.importanceBox', function() {
        if ( $(this).hasClass('importanceSelected') ) {
            $(this).removeClass('importanceSelected');
        } else {
            $(this).addClass('importanceSelected');
        }
    });

    // Modal custom color selected css
    $(document).on('click', '.customColor', function() {
        $('.customColor').removeClass('customColorSelected');
        $(this).addClass('customColorSelected');
        
    });


    // Submission scripts
    $(document).on('submit', '.dialogBox__form', function(e) {
        e.preventDefault();
        createNewListItem();
        $('.addNewTaskModal').hide();
    });


    // Remove item js, trigger ajax
    $(document).on('click', '.remove', function() {
        let todoItem = $(this).parents('.todo-item');
        $(todoItem).addClass('removalClassRed');
        $(todoItem).slideUp(600, function() { $(todoItem).remove();});
        removeFromFile($(todoItem).children('[name="task_id"]').val());
    });


    // Check off as done css
    $(document).on('click', '.js-done', function() {
        let todoItem = $(this).parents('.todo-item');
        $(todoItem).addClass('removalClassGreen');
        $(todoItem).slideUp(600, function() { $(todoItem).remove();});
        markAsDone($(todoItem).children('[name="task_id"]').val());
    });

    fileToLocalStorage();


    $(document).on('click', '.js-important', function() {
        displayImportantTasks();
    });

    $(document).on('click', '.js-all', function() {
       displayAllTasks();
    });

    $(document).on('click', '.js-done-tasks-list', function() {
       displayDoneTasks();
    });


});


// Create new list in FE, trigger ajax
function createNewListItem() {
    let newCopy = $( '.todo-copy' ).clone(true, true).removeClass('todo-copy').hide().prependTo( '.i3__list' ).slideDown("fast");
    let name = $('[name="todo_name"]').val();
    let category = $('[name="category"]').val();
    let chosenColorClass = $('.customColorSelected').data('cl');
    let important = 0;

    if ($('.fa-star').hasClass('importanceSelected')) {
        $(newCopy).addClass('importantColors');
        important = 1;
    }

    $(newCopy).children('.l2').addClass(chosenColorClass);
    $(newCopy).children('.l3').text(name);
    $(newCopy).children('.l5').text(category);
    cleanModalFields();
    addNewToFile(name, category, chosenColorClass, important, $(newCopy));
}

function cleanModalFields(){
    $('[name="todo_name"]').val('');
    $('[name="category"]').val('');
    $('.fa-star').removeClass('importanceSelected');

}

// Ajax create new task, save to database.json
function addNewToFile(name, category, chosenColorClass, important, taskObject) {
    let fileData = {
        'name': name,
        'category': category, 
        'colorclass': chosenColorClass, 
        'important': important
    }

    let url = 'add.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: fileData
    }).done(function(response) {
        $(taskObject).children('[name="task_id"]').val(response);
        // Add to local storage
        let currentStorage = JSON.parse(localStorage.getItem("todo"));
        fileData['id'] = response;
        fileData['done'] = 0;

        if ( currentStorage['data'] === undefined || currentStorage['data'].length == 0) {
            let storageData = {
                'data': [fileData]
            }

            localStorage.setItem('todo', JSON.stringify(storageData));
        } else {
            currentStorage['data'].push(fileData);
            localStorage.setItem('todo', JSON.stringify(currentStorage));
        }

    });
}

function removeFromFile(taskId) {
    let url = 'remove.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: {'task_id': taskId}
    }).done(function(response) {
        console.log(response);
        // Remove from local storage
        let currentStorage = JSON.parse(localStorage.getItem('todo'));
        for(let i=0; i < currentStorage['data'].length;i++) {
            if (currentStorage['data'][i]['id'] == taskId) {
                currentStorage['data'].splice(i, 1);
            }
        }

        localStorage.setItem('todo', JSON.stringify(currentStorage));

    });
}

function markAsDone(taskId) {
    let url = 'done.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: {'task_id': taskId}
    }).done(function(response) {
        console.log(response);
        // Mark as done in local storage
        let currentStorage = JSON.parse(localStorage.getItem('todo'));
        for(let i=0; i < currentStorage['data'].length;i++) {
            if (currentStorage['data'][i]['id'] == taskId) {
                currentStorage['data'][i]['done'] = 1;
            }
        }

        localStorage.setItem('todo', JSON.stringify(currentStorage));
    });
}

// Runs on page load
function fileToLocalStorage() {
    var fileData; 
    $.getJSON('data.php', function(jsonData) {
        fileData = jsonData;
        console.log(fileData['data'][0]);
        if (fileData) {
            localStorage.setItem('todo', JSON.stringify(fileData));
        } 
    }); 
}


function removeCurrentViewTasks() {
    $( ".todo-item" ).each(function( index ) {
        if (!$(this).hasClass('todo-copy')) {
           $(this).remove();
        }
    });
}

function displayImportantTasks() {
    let currentStorage = JSON.parse(localStorage.getItem('todo'));
    if ( currentStorage['data'] === undefined || currentStorage['data'].length == 0) {
        return;
    }

    removeCurrentViewTasks();
    for(let i=0; i < currentStorage['data'].length;i++) {

        if (currentStorage['data'][i]['done'] == 0 && currentStorage['data'][i]['important'] == 1) {
            let newCopy = $( '.todo-copy' ).clone(true, true).removeClass('todo-copy').hide().prependTo( '.i3__list' ).slideDown("fast");
            $(newCopy).children('.l2').addClass(currentStorage['data'][i]['colorclass']);
            $(newCopy).children('.l3').text(currentStorage['data'][i]['name']);
            $(newCopy).children('.l5').text(currentStorage['data'][i]['category']);
            $(newCopy).addClass('importantColors');
            $(newCopy).children('[name="task_id"]').val(currentStorage['data'][i]['id']);
        }

    }
}

function displayAllTasks() {
    let currentStorage = JSON.parse(localStorage.getItem('todo'));
    if ( currentStorage['data'] === undefined || currentStorage['data'].length == 0) {
        return;
    }

    removeCurrentViewTasks();
    for(let i=0; i < currentStorage['data'].length;i++) {

        if (currentStorage['data'][i]['done'] == 0) {
            let newCopy = $( '.todo-copy' ).clone(true, true).removeClass('todo-copy').hide().prependTo( '.i3__list' ).slideDown("fast");
            $(newCopy).children('.l2').addClass(currentStorage['data'][i]['colorclass']);
            $(newCopy).children('.l3').text(currentStorage['data'][i]['name']);
            $(newCopy).children('.l5').text(currentStorage['data'][i]['category']);
            $(newCopy).children('[name="task_id"]').val(currentStorage['data'][i]['id']);
            if (currentStorage['data'][i]['important'] == 1 ) {
                $(newCopy).addClass('importantColors');
            }
            
        }
    }
}

function  displayDoneTasks() {
    let currentStorage = JSON.parse(localStorage.getItem('todo'));
    if ( currentStorage['data'] === undefined || currentStorage['data'].length == 0) {
        return;
    }

    removeCurrentViewTasks();
    for(let i=0; i < currentStorage['data'].length;i++) {
        
        if (currentStorage['data'][i]['done'] == 1) {
            let newCopy = $( '.todo-copy' ).clone(true, true).removeClass('todo-copy').hide().prependTo( '.i3__list' ).slideDown("fast");
            $(newCopy).children('.l2').addClass(currentStorage['data'][i]['colorclass']);
            $(newCopy).children('.l3').text(currentStorage['data'][i]['name']);
            $(newCopy).children('.l5').text(currentStorage['data'][i]['category']);
            $(newCopy).addClass('importantColors');
            $(newCopy).children('[name="task_id"]').val(currentStorage['data'][i]['id']);
        }

    }
}