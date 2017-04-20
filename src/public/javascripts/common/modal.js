
$(function() {

    // ---------------------------------- ----------------------------------
    // Declare Variables
    // ---------------------------------- ----------------------------------


    // OWN MODAL
    // var $pxcModal = $('.pxc-modal-wrapper'),
    var $pxcModal,
        $pxcModalCross,
        $pxcModalContent,
        $body = $('body'),
        $main = $('main'),
        // $pxcModalContent = $('.pxc-modal-content'),
        // $pxcModalCross = $('.pxc-modal-close-cross'),
        $navIcon = $('.nav-burger-icon'),
        $pxcTrigger = $('.pxc-modal-trigger');


    // ---------------------------------- ----------------------------------
    // Event-Listener for Slide-Up and Down Modal Bottom Sheet
    // ---------------------------------- ----------------------------------

    // to ensure triggering the wanted event end:
    // >> if condition for property name on transition
    // >> if condition for animation name on animations

    // OPEN MODAL

    $pxcTrigger.on('click', function() {

        // get ID from trigger to 
        $pxcModal = $('.'+$(this)[0].id);
        $pxcModalContent= $('.'+$(this)[0].id+ ' .pxc-modal-content');
        $pxcModalCross = $('.'+$(this)[0].id+ ' .pxc-modal-close-cross');

        $body.css('overflow', 'hidden');
        $pxcModal.css('display', 'block');

        // slide up modal container into viewport
        $pxcModal.addClass('slide-modal-up');

        $pxcModal.on(animationEvent, function(e) {
            
            if(e.originalEvent.animationName == "slide-modal-up"){

                $pxcModal.removeClass('slide-modal-up');
                $pxcModal.css({
                    '-webkit-transform': 'translateY(0)',
                    'transform': 'translateY(0)'
                });
                $pxcModalContent.fadeTo(200, 1);
                $pxcModal.off(e);
            }
        });

    });


    // CLOSE MODAL

    $('.pxc-modal-close-cross, .pxc-modal-close-btn').on("click", function() {

        $pxcModalContent.fadeTo(300, 0);
        $pxcModalCross.addClass('animation-spin');
        $pxcModalCross.on(animationEvent, function(e) {
            if(e.originalEvent.animationName == 'spin'){
                $(this).removeClass('animation-spin');
                $(this).off(e);
                slideDown();
            }
        });

        function slideDown() {
            $pxcModal.addClass('slide-modal-down');

            $pxcModal.on(animationEvent, function(e) {
                if(e.originalEvent.animationName == "slide-modal-down"){
                    $pxcModal.removeClass('slide-modal-down');
                    $pxcModal.css({
                        '-webkit-transform': 'translateY(100%)',
                        'transform': 'translateY(100%)'
                    });

                    slideMenuDown();
                    $pxcModal.off(e);
                }
                
            });

        }

        function slideMenuDown(){
            $navIcon.css({
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            });
            $body.css('overflow', 'auto');

            $navIcon.on(transitionEvent, function(e) {
                if(e.originalEvent.propertyName == "-webkit-transform" ||
                   e.originalEvent.propertyName == "transform"){
                    $navIcon.off(e);
                }
            });
        }

    });

}); // end of document ready




