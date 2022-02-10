
jQuery(document).ready(function() {
    jQuery(".modal_overlay, .closeModal, .user_save_password").click(function(){
        // jQuery(".reset_password_modal").hide(500);
        jQuery(".reset_password_modal").css("display", "none");
    });
    
    jQuery(".show_reset_password").click(function(){
        // jQuery(".reset_password_modal").show(500);
        jQuery(".reset_password_modal").css("display", "block");
    });

    jQuery(".deleteUserBtn").click(function(){
        $(this).parent().parent().parent().parent().addClass("remove_data");
        jQuery(".confirm_delete_user").show();
    });

    jQuery(".modifyUserBtn").click(function(){
        // jQuery(".custome_modal").show(500);
        jQuery(".custome_modal").css("display", "block");
    });

    $('.confirmDeleteUser').click(function(){
        jQuery(".confirm_delete_user").hide();
        jQuery(".remove_data").remove();
   });
    $('.noDeleteUser').click(function(){
        jQuery(".confirm_delete_user").hide();
        jQuery(".remove_data").removeClass("remove_data");
   });
   $(".use_save_change").click(function(){
    showNotification();
   })
});