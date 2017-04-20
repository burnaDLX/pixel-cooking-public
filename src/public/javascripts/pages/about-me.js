$(function() {

    // init scroll animations
    AOS.init();

    // scroll to anchor
    var scrollToID = function(thisId) {
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: thisId.offset().top
            }, 600);
        }, 500);
    };

    if (!!window.location.hash){
    	scrollToID($(window.location.hash));
    	// remove hash from url
    	history.replaceState("", document.title, window.location.pathname);
    }

});
