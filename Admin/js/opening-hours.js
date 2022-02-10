jQuery(document).ready(function () {
    $("input").on('input', function (e) {
        enableSubmit();
    });
    $(".btn-submit").click(function(e){
        showNotification();
   });
});

function enableSubmit() {
    $(".btn-submit").removeClass('inactive');
}