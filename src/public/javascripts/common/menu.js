    // ---------------------------------- ----------------------------------
    // Handling Transition- and Animation-Endings (Cross-Browser Solution)
    // read: https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
    // ---------------------------------- ----------------------------------


    

    function whichAnimationEvent(){
      var t,
          el = document.createElement("fakeelement");

      var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
      };

      for (t in animations){
        if (el.style[t] !== undefined){
          return animations[t];
        }
      }
    }

    var animationEvent = whichAnimationEvent();

    function whichTransition(){
      var t,
          el = document.createElement("fakeelement");

      var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
      };

      for (t in transitions){
        if (el.style[t] !== undefined){
          return transitions[t];
        }
      }
    }

    var transitionEvent = whichTransition();


$(function() { initPage().activateTouch();});

var initPage = function() {

    // ---------------------------------- ----------------------------------
    // VARIABLES
    // ---------------------------------- ----------------------------------

    var $oNav = $('#open-nav'),
        $cNav = $('#close-nav'),
        $nLayer = $('#nav-layer'),
        $overlay = $('.bg-overlay'),
        $nContent = $('.nav-content'),
        $nSwipe = $(".nav-swipe-area.touch"),
        $nLayerTouch = $('#nav-layer.touch'),
        $nSwipes = $(".nav-swipe-area"),
        $body = $('body'),
        $main = $('main'),
        clickedLink = false,
        $pWrapper = $('.page-wrapper');


    // ---------------------------------- ----------------------------------
    // Handling Transition- and Animation-Endings (Cross-Browser Solution)
    // read: https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
    // ---------------------------------- ----------------------------------





    // to ensure triggering the wanted event end:
    // >> if condition for property name on transition
    // >> if condition for animation name on animations
    
    var open = false;
    
    $oNav.on('click', function() {
        open = true;
        $(this).css({
            '-webkit-transform': 'translateY(-60px) rotate(60deg)',
            'transform': 'translateY(-60px) rotate(60deg)'
        });
        $(this).on(transitionEvent, function(e) {
            if(e.originalEvent.propertyName == "-webkit-transform" ||
             e.originalEvent.propertyName == "transform"){
                //$pWrapper.fadeTo(300, 0); //11.04.17
                $body.css('overflow', 'hidden');
                slideIn();
                $(this).off(e);
                $overlay.fadeIn(200); //11.04.17             
            }
        });
        
        function slideIn(){
            $nLayer.addClass('animation-left');

            $main.addClass('animation-container-left');
            
            $main.on(animationEvent, function(e) {
                if(e.originalEvent.animationName == "xAxisMainDesktop" ||
                   e.originalEvent.animationName == "xAxisMainMobile"){ //11.04.17
                    $main.removeClass('animation-container-left');
                    if(e.originalEvent.animationName == "xAxisMainDesktop") //11.04.17
                        $main.css({
                            '-webkit-transform': 'translateX(-300px)',
                            'transform': 'translateX(-300px)'
                        });
                    else if(e.originalEvent.animationName == "xAxisMainMobile") //11.04.17
                        $main.css({
                            '-webkit-transform': 'translateX(-100%)',
                            'transform': 'translateX(-100%)'
                        });
                }            
            });

            $nLayer.on(animationEvent, function(e) {
                
                if(e.originalEvent.animationName == "xAxisDesktop" ||
                   e.originalEvent.animationName == "xAxisMobile"){ //11.04.17

                    $nLayer.removeClass('animation-left');
                    $nLayer.css({
                        '-webkit-transform': 'translateX(0)',
                        'transform': 'translateX(0)'
                    });
                    $nContent.fadeTo(200, 1);
                    $cNav.fadeTo(200, 1);
                    $nLayer.off(e);
                }
            });
        }
    });


    $cNav.on("click", function() {

        $(this).fadeTo(300, 0);
        $nContent.fadeTo(200, 0);
        $(this).addClass('animation-spin');
        $(this).on(animationEvent, function(e) {
            if(e.originalEvent.animationName == 'spin'){
                $(this).removeClass('animation-spin');
                $(this).off(e);
                slideOut();
            }
        });

        function slideOut() {
            $overlay.fadeOut(200); //11.04.17

            
            $nLayer.addClass('animation-right');

            $nLayer.on(animationEvent, function(e) {
                if(e.originalEvent.animationName == "xAxisDesktop" ||
                   e.originalEvent.animationName == "xAxisMobile"){ //11.04.17
                    
                    $nLayer.removeClass('animation-right');

                    if(e.originalEvent.animationName == "xAxisDesktop") //11.04.17
                        $nLayer.css({
                            '-webkit-transform': 'translateX(300px)',
                            'transform': 'translateX(300px)'
                        });
                    else if(e.originalEvent.animationName == "xAxisMobile") //11.04.17
                        $nLayer.css({
                            '-webkit-transform': 'translateX(100%)',
                            'transform': 'translateX(100%)'
                        });

                    // $nContent.fadeTo(200, 0);
                    // $cNav.fadeTo(200, 0);
                    slideMenuDown();
                    $nLayer.off(e);
                }
                
            });


            $main.addClass('animation-container-right');
            
            $main.on(animationEvent, function(e) {
                //if(e.originalEvent.animationName == "xAxis"){ //11.04.17
                if(e.originalEvent.animationName == "xAxisMainDesktop" ||
                   e.originalEvent.animationName == "xAxisMainMobile"){ //11.04.17
                    $main.removeClass('animation-container-right');
                    $main.css({
                        '-webkit-transform': 'translateX(0)',
                        'transform': 'translateX(0)'
                    });
                }            
            });


        }

        function slideMenuDown(){
            $oNav.css({
                        '-webkit-transform': 'translateY(0)',
                        'transform': 'translateY(0)'
                    });
            $body.css('overflow', 'auto');
            $oNav.on(transitionEvent, function(e) {
                if(e.originalEvent.propertyName == "-webkit-transform" ||
                   e.originalEvent.propertyName == "transform"){
                    $oNav.off(e);
                    open = false;
                }
            });
        }

    });

    // close menu on click off overlay
    $overlay.on( "click", function(){//11.04.17
        $cNav.trigger('click');
    });
    // eventlistener to adjust menu size on window resizing
    $(window).on('resize', function(){//11.04.17
        if(!open){
            if($(window) >= 568)
                $nLayer.css({
                    '-webkit-transform': 'translateX(300px)',
                    'transform': 'translateX(300px)'
                });
            else
                $nLayer.css({
                    '-webkit-transform': 'translateX(100%)',
                    'transform': 'translateX(100%)'
                });
        }
    });

    // ---------------------------------- ----------------------------------
    // Touch Events On Mobile
    // ---------------------------------- ----------------------------------

    // touch detection, open and close menu on mobile with
    // jquery mobile, touch events libary only (7kb)

    var detectTouchDevice = function(){            

        // if user is on a touchscreen device...
        if (Modernizr.touch)
            loadScript('/resources/jquery/jquery.mobile-1.4.5.touch-events.min.js');
    };

    // ...load jquery mobile Script...
    function loadScript(path) {
        $.getScript(path)
            .done(function(script, textStatus) {
                // ...and call swipe handler...
                initTouchEvents();
            })
            .fail(function(jqxhr, settings, exception) {
                // or show error in development mode
                console.log("Triggered ajaxError handler.");
            });
    }


    function initTouchEvents() {
        $nSwipes.on("swipeleft", function() {
            $oNav.trigger('click');
        });
        $nLayer.on("swiperight.touch", function() {
            $cNav.trigger('click');
        });
        // close menu on swipe right
        $('#nav-layer, .bg-overlay').on("swiperight.touch", function() {
            $cNav.trigger('click');
        });
    }

    $('.nav-link').on( "click", function(e){

        var linkUrl = $(this).attr("href"),
           location  = window.location;

        // if link == origin, close menu and stay on page   
        if(location.pathname == linkUrl){    
            $cNav.trigger('click');
            e.preventDefault();
        }

    });

    return {
        activateTouch: detectTouchDevice
    };
};