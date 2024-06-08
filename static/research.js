$(document).ready(function(){
//    $('#add-input').val(0)
    $('#increment-button').on('click', function(){
        let currentValue = parseInt($('#add-input').val());
        $('#add-input').val(currentValue + 1);
    });

    $('#decrement-button').on('click', function(){
        let currentValue = parseInt($('#add-input').val());
        $('#add-input').val(currentValue - 1);
    });
    $('#add-input').focusout(function(){
        if($('#add-input').val() ==='') {
            $('#add-input').val(0)
        }


    })
})


