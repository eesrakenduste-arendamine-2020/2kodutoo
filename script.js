$(document).ready(function() {

    // Search box css
    $(document).on('click', '.icon', function() {
        $('.input-field').focus();
    });

    $(document).on('focusin', '.input-field', function() {
        $('.icon').css('opacity', 0);
    });

    $(document).on('focusout', '.input-field', function() {
        if ($(this).val() == '') {
            $('.icon').css('opacity', 0.8);
        }
    });

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
    // TODO loadingModal() vms?
    addNewToFile(name, category, chosenColorClass, important, $(newCopy));
}

function cleanModalFields(){
    $('[name="todo_name"]').val("");
    $('[name="category"]').val("");
    $('.fa-star').removeClass('importanceSelected');

}

// Ajax create new task, save to database.json
function addNewToFile(name, category, chosenColorClass, important, taskObject) {
    let url = 'add.php';
    $.ajax({
        type: "POST",
        url: url,
        data: {"name": name, "category": category, "colorclass": chosenColorClass, "important": important}
    }).done(function(response) {
       $(taskObject).children('[name="task_id"]').val(response);
    });
}

function removeFromFile(taskId) {
    let url = 'remove.php';
    $.ajax({
        type: "POST",
        url: url,
        data: {"task_id": taskId}
    }).done(function(response) {
       console.log(response);
    });
}

function markAsDone(taskId) {
    let url = 'done.php';
    $.ajax({
        type: "POST",
        url: url,
        data: {"task_id": taskId}
    }).done(function(response) {
       console.log(response);
    });
}