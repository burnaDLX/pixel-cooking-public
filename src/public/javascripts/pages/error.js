$(function() {

    // fix to hide overflow-y on
    // button fade-up-animation

    function whichAnimationEvent() {
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }

    var animationEvent = whichAnimationEvent(),
        $pxcBtn = $('.pxc-btn-wrapper'),
        $sectionOutro = $('.section-outro');

    $pxcBtn.on(animationEvent, function(e) {
        if (e.originalEvent.animationName == "fade-up") {
            $(this).css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)',
                'opacity': '1'
            });
            $('.section-outro').css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)',
                'opacity': '1'
            });
            $('body').css('overflow-y', 'auto');
            $(this).off(e);
        }
    });

    $sectionOutro.on(animationEvent, function(e) {
        if (e.originalEvent.animationName == "fade-up") {
            $(this).css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)',
                'opacity': '1'
            });
            $(this).off(e);
        }
    });


});
