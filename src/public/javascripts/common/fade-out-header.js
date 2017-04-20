$(function() {

	// fade out on scroll
	var $target = $('.background-header'),
		$object = $('#fade-out-header');

    
    $(window).scroll(function(event) {
        var $elem = $object.offset().top;
        // fix sidenav
        var opac;

        if ($(window).scrollTop() > 0) {
            
            opac = ($(window).scrollTop() / $elem);
            $target.css('opacity', 1-opac);

        }

    });


});
