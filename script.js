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



});