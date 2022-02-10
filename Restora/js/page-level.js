
 $('.effect-16').on('input',function(){
         	if($(this).val() != '')
         	{
         		$(this).addClass('hidelabel');
         	}	
         	if($(this).val() == '')
         	{
         		$(this).removeClass('hidelabel');
         	}	
         });


$(document).ready(function() {
		
		$( 'a[href*="#"]:not([href="#"])' ).click( function(e) {
		//$('a[href*=#]').bind('click', function(e) {
				e.preventDefault(); // prevent hard jump, the default behavior

				var target = $(this).attr("href"); // Set the target as variable
				// perform animated scrolling by getting top-position of target-element and set it as scroll target
				$('html, body').stop().animate({
						scrollTop: $(target).offset().top
				}, 600, function() {
						location.hash = target; //attach the hash (#jumptarget) to the pageurl
				});


	$("body").find('.cartElementWrap').fadeOut();

	$("body").find(".catItemPopup").fadeOut();
			$('body').css('overflow', 'auto');
				return false;
		});
});


$(".search-bar i").click( function(e) {
	$(".search-form").fadeIn();
	$(".search-box").focus();
	$(".serch-btn").addClass('text-blue');
});



$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();

		// Show/hide menu on scroll
		//if (scrollDistance >= 850) {
		//		$('nav').fadeIn("fast");
		//} else {
		//		$('nav').fadeOut("fast");
		//}
	var extraH='';
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		extraH=400;
	}
	var leftPos = $('.catNavOuter').scrollLeft();
		// Assign active class to nav links while scolling
		$('.page-section').each(function(i) {
				if ($(this).position().top <= scrollDistance+extraH) {
						$('.navigation a.active').removeClass('active');
						if($('#selectedval').val() == 0)
						{
							$('.navigation a').eq(i).addClass('active');
						}
						else
						{
							$('.navigation a').eq(Number($('#selectedval').val())-1).addClass('active');
						}
						$('.navigation a').eq(i).focus();
						var jump = $('.navigation a').attr('href');	
	 					//$('#selectedval').val(0);					
	
			if(i==3){
				$('.catNavOuter').scrollTo("#coodi"+i);
			}

		}
		});
}).scroll();



function scrollToCategory(val){
	if($("body").find('.search-form').css('display') == 'block'){
		$("body").find('.search-form').fadeOut();
	}
	else{
		$('#selectedval').val(val);
		$('html, body').animate({
				scrollTop: $("#"+val).offset().top-120
			}, 1000);
			setTimeout(function() {
				$('#selectedval').val(0);		
			}, 1000);
		}
		$('.effect-16').on('input',function(){
			if($(this).val() != '')
			{
				$(this).addClass('hidelabel');
			}	
			if($(this).val() == '')
			{
				$(this).removeClass('hidelabel');
			}	
		});
	}