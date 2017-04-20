$(function () {

	//--------------------------------------
	// init scroll animations
	AOS.init();	

	//--------------------------------------
	// scroll to last pos if user returns

	$(window).unload(function() {
		//set scroll position in session storage
		sessionStorage.scrollPos = $(window).scrollTop();
	});

	var init = function () {
	   //return scroll position in session storage
	   
		var origin = document.referrer;
		if(origin.match("pgp-bird") || origin.match("sketchbook")){
			//history.replaceState("", document.title, window.location.pathname);
			$(window).scrollTop(sessionStorage.scrollPos-80 || 0);
		}

	};
	init();

});


$(window).load(function() {
	
	//--------------------------------------
    // REDRAW LINE

	// get height of first and last timeline icon
	// to calculate the length of the dotted line
	var redrawLine = function(){
	
		var height = $('.tl-icon').first().offset(),
			offset = $('.tl-icon').last().offset();

		$('.tl-line').css('height', offset.top - height.top);
	};
	// set initial value
	redrawLine();

	// update value on browser-resize
	$(window).resize(function() {
		redrawLine();
	});



});
