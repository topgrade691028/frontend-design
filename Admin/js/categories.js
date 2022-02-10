
jQuery(document).ready(function() {
    $(".create_new_category").click(function(){
        $("#category_list").prepend('<div class="card"><div class="opener"><i class="icon-drop"></i><div class="title-wrap category_title_edit"><label class="text_label">Category Title</label><a href="javascript:void(0)" class="edit"><i class="icon-edit"></i></a><input type="text" class="editTitleField" value="Category Title"/></div><div class="deleteCatagody"><i class="icon-more"></i> <a href="javascript:void(0)" class="deleteCategory">Delete</a></div><div class="btn-wrap"><a class="btn btn-default collapse" href="#"><i class="icon-minimize"></i>Collapse</a><a class="btn btn-default" href="#">Delete</a><a class="btn btn-default inactive" href="#">Modify</a><a class="btn btn-primary item-expand lightbox" href="#popup">Add Product</a></div></div></div>');
        resetClickAction();
    });

    
     jQuery(document).on("click",".no_delet",function(){
         jQuery(".confirm_delete").hide();
         jQuery(".card").removeAttr("remove_cat");
     });
     jQuery(document).on("click",".conriftDelet",function(){
         jQuery(".confirm_delete").hide();
         jQuery(".card.remove_cat").remove();
     });

     $(".dataSave").click(function(e){
        showNotification();
     });
     resetClickAction();
});

function resetClickAction() {
    $('.deleteCategory').click(function(){
        $(this).parent().parent().parent().addClass("remove_cat");
        jQuery(".confirm_delete").show();
    });
}