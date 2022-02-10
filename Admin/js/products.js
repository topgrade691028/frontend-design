jQuery(document).ready(function() {    
    $(window).click(function() {
        $(".item-box.selected").removeClass("selected");
        resetButtonStatus();
    });
    
    $('.confirmDeleteProduct').click(function(){
        jQuery(".confirm_delete_products").hide();
        $(".item-box.selected").parent().remove();
    });
    $('.noDeleteProduct').click(function(){
        jQuery(".confirm_delete_products").hide();
    });
    $('.btn-save-product').click(function(){
        if($("#popup").hasClass("editing")){
            $(".current_list").append('<div class="col-xs-12 col-sm-6 col-lg-4"><a class="item-box" ><img class="item-image" src="images/sangrilla.png" srcset="images/sangrilla.png 1x, images/sangrilla@2x.png 2x, images/sangrilla@3x.png 3x" alt="image description"><div class="item-text"><h5>Fish (2 pieces)</h5><div class="item-description">Add Description</div><div class="item-price">$7.60</div></div><i class="icon-drop"></i></a></div>');
        }
        jQuery.fancybox.close();
        resetClickAction();
    });
    resetClickAction();
    resetButtonStatus();
});

function resetClickAction(){
    $('.item-box').click(function(e){
        e.stopPropagation();
        $(".item-box.selected").removeClass("selected");
        $(this).addClass("selected");
        resetButtonStatus();
   });
}

function resetButtonStatus(){
    $(".btn-delete").each(function( index ) {
        var isEnable = $(this).parents(".card").find(".item-box.selected").length > 0;
        if(isEnable){
            $(this).removeClass("inactive");
        }else{
            $(this).addClass('inactive');
        }
    });
    $(".btn-modify").each(function( index ) {
        var isEnable = $(this).parents(".card").find(".item-box.selected").length > 0;
        if(isEnable){
            $(this).removeClass("inactive");
        }else{
            $(this).addClass('inactive');
        }
    });
    $(".btn").click(function(e){
        e.stopPropagation();
    });
    $(".btn-modify").click(function(e){
        $("#popup").removeClass("editing");
        $.fancybox([
            { 
                href : '#popup',
                helpers: {
                    overlay: {
                        css: {
                            background: 'rgba(0, 0, 0, 0.65)'
                        }
                    }
                },
                afterLoad: function(current, previous) {
                    // handle custom close button in inline modal
                    if (current.href.indexOf('#') === 0) {
                        jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e) {
                            e.preventDefault();
                            jQuery.fancybox.close();
                        });
                    }
                },
            }
        ]);
    });
    $(".btn-add-product").click(function(e){
        $(".current_list").removeClass(".current_list");
        $(this).parent().parent().parent().find(".sortable_list").addClass("current_list");
        $("#popup").addClass("editing");        
        $.fancybox({
            href : '#popup',
            helpers: {
                overlay: {
                    css: {
                        background: 'rgba(0, 0, 0, 0.65)'
                    }
                }
            },
            afterLoad: function(current, previous) {
                // handle custom close button in inline modal
                if (current.href.indexOf('#') === 0) {
                    jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e) {
                        e.preventDefault();
                        jQuery.fancybox.close();
                    });
                }
            },
        });
    })
    $(".btn-delete").click(function(e){
        jQuery(".confirm_delete_products").show();
    });
}