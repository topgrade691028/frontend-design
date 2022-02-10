
$('.navDetailList li a').click(function (event) {
	if ($("body").find('.search-form').css('display') == 'block') {
		$("body").find('.search-form').fadeOut();
		// $('.catItemPopup').fadeIn();
	}
	else {
		event.preventDefault();
		$('.catItemPopup').fadeIn();
		$('body').css('overflow', 'hidden');
	}


	if ($(window).width() > 767) {
		$('body').css('margin-right', getScrollbarWidth() + 'px');
	}
});


$('.effect-16').on('input', function () {
	console.log('dddddddddddddd')
	if ($(this).val() != '') {
		$(this).addClass('hidelabel');
	}
	if ($(this).val() == '') {
		$(this).removeClass('hidelabel');
	}
});


$('.catItemPopupClose').click(function (event) {

	// using When & then methods.
	$.when($('.catItemPopup').fadeOut())
		.then(function () {
			$('body').css('overflow', 'auto');
			$('body').css('position', 'unset');
			if ($(window).width() > 767) {
				$('body').css('margin-right', '0px');
			}
		});

});



function cartIncrement(event, value) {
	var currentVal = event.currentTarget.closest('.orderAddRemoveBtns');
	currentVal = $(currentVal).find('.orderQty');
	currentVal = $(currentVal).text();
	currentVal = parseInt(currentVal);
	if (value == -1 && currentVal != 0) {
		var newVal = currentVal + value;
		currentVal = event.currentTarget.closest('.orderAddRemoveBtns');
		currentVal = $(currentVal).find('.orderQty');
		currentVal = $(currentVal).html(newVal);
	}
	if (value == 1 && currentVal >= 0) {
		var newVal = currentVal + value;
		currentVal = event.currentTarget.closest('.orderAddRemoveBtns');
		currentVal = $(currentVal).find('.orderQty');
		currentVal = $(currentVal).html(newVal);
	}
}
var windowWidth = $(window).width();
if (windowWidth > 760) {

	$(window).on('load', function () {
		stickySection('.cartOuterWrap', '.cartElementWrap', '.stickyElementsContainer');
		stickySection('.catNavOuter', '.catNavWrap', '.categoriesWrapper');
	})
	$(window).resize(function (event) {
		setTimeout(function () {
			stickySection('.cartOuterWrap', '.cartElementWrap', '.stickyElementsContainer');
			stickySection('.catNavOuter', '.catNavWrap', '.categoriesWrapper');
		}, 300)
	});
}

$(document).ready(function () {

	$('a[href*="#"]:not([href="#"])').click(function (e) {
		//$('a[href*=#]').bind('click', function(e) {
		e.preventDefault(); // prevent hard jump, the default behavior

		var target = $(this).attr("href"); // Set the target as variable
		// perform animated scrolling by getting top-position of target-element and set it as scroll target
		$('html, body').stop().animate({
			scrollTop: $(target).offset().top
		}, 600, function () {
			location.hash = target; //attach the hash (#jumptarget) to the pageurl
		});


		$("body").find('.cartElementWrap').fadeOut();

		$("body").find(".catItemPopup").fadeOut();
		$('body').css('overflow', 'auto');
		return false;
	});
});


$(".search-bar div").click(function (e) {
	$(".search-form").fadeIn();
	$(".search-box").focus();
	$(".serch-btn").addClass('text-blue');
	// $(".search-bar").hide(500);
});





$(window).scroll(function () {
	var scrollDistance = $(window).scrollTop();

	// Show/hide menu on scroll
	//if (scrollDistance >= 850) {
	//		$('nav').fadeIn("fast");
	//} else {
	//		$('nav').fadeOut("fast");
	//}
	var extraH = '';
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		extraH = 400;
	}
	var leftPos = $('.catNavOuter').scrollLeft();
	// Assign active class to nav links while scolling
	$('.page-section').each(function (i) {
		if ($(this).position().top <= scrollDistance + extraH) {
			$('.navigation a.active').removeClass('active');
			if ($('#selectedval').val() == 0) {
				$('.navigation a').eq(i).addClass('active');
			}
			else {
				$('.navigation a').eq(Number($('#selectedval').val()) - 1).addClass('active');
			}
			var windowWidth = $(window).width();
			if (windowWidth < 767) {
				$('.navigation a').eq(i).focus();
			}
			var jump = $('.navigation a').attr('href');
			//$('#selectedval').val(0);					

			if (i == 3) {
				$('.catNavOuter').scrollTo("#coodi" + i);
			}

		}
	});
}).scroll();

$(document).ready(function () {

	$(window).scroll(function () {
		//  console.log($(window).scrollTop())
		//if ($(window).scrollTop() > 5) {
		//  $('#header').addClass('navbar-fixed');
		// }
		// if ($(window).scrollTop() < 6) {
		//    $('#header').removeClass('navbar-fixed');
		//  }
	});
});


function getScrollbarWidth() {

	// Creating invisible container
	const outer = document.createElement('div');
	//outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;

}




function scrollToCategory(val) {
	if ($("body").find('.search-form').css('display') == 'block') {
		$("body").find('.search-form').fadeOut();
	}
	else {
		$('#selectedval').val(val);
		$('html, body').animate({
			scrollTop: $("#" + val).offset().top - 120
		}, 1000);
		setTimeout(function () {
			$('#selectedval').val(0);
		}, 1000);
	}
	$('.effect-16').on('input', function () {
		if ($(this).val() != '') {
			$(this).addClass('hidelabel');
		}
		if ($(this).val() == '') {
			$(this).removeClass('hidelabel');
		}
	});
}



(function () {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function () {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function () {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
		// in case the input is already filled..
		if (inputEl.value.trim() !== '') {
			classie.add(inputEl.parentNode, 'input--filled');
		}

		// events:
		inputEl.addEventListener('focus', onInputFocus);
		inputEl.addEventListener('blur', onInputBlur);
	});

	function onInputFocus(ev) {
		classie.add(ev.target.parentNode, 'input--filled');
	}

	function onInputBlur(ev) {
		if (ev.target.value.trim() === '') {
			classie.remove(ev.target.parentNode, 'input--filled');
		}
	}
})();




