$(document).ready(function() {

    // Search box styles
    $(document).on('click', '.icon', function() {
        $('.input-field').focus();
    });

    $(document).on('focusin', '.input-field', function() {
        $('.icon').css('opacity', 0);
    });

    $(document).on('focusout', '.input-field', function() {
        if ($(this).val() == '') {
            $('.icon').css('opacity', 1);
        }
    });

    // Add-new button styles
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

});