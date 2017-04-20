// phone image slider 

$(function() {
        
    // -------------------------------
    // load screenfull.js
    // -------------------------------

    var initFullscreen = function() {

        var $fsButton = $('.swiper-fs-button'),
            $closeFsButton = $('.swiper-close-fs-button'),
            $elem = $('.swiper-container');

        $fsButton.show();

        $fsButton.on('click', function() {
            if (screenfull.enabled) {
                screenfull.request($elem[0]);
                $elem.addClass('fullscreen-wrapper');
                $elem.find('.swiper-slide').addClass('fullscreen');
                $fsButton.hide();
                $closeFsButton.show();
            }
            else {
                $fsButton.fadeOut();
                alert('Dein Browser unterstützt leider den Fullscreen Modus nicht. Probiere es nochmal mit einem neueren Browser!');
            }

        });

        $closeFsButton.on('click', function() {            
            screenfull.exit();
            $closeFsButton.hide();
            $fsButton.show();
            $elem.removeClass('fullscreen-wrapper');
            $elem.find('.swiper-slide').removeClass('fullscreen');
        });

    };

    // load jquery mobile Script
    function loadScript(path) {
        $.getScript(path)
            .done(function(script, textStatus) {
                // and call swipe handler
                initFullscreen();
            });
    }

    // -------------------------------
    // init slider
    // -------------------------------

    var initSlider = function(device) {
        var pgpSlider = new Swiper('.swiper-container', {
            // Optional parameters
            keyboardControl: true,
            preloadImages: false,
            lazyLoading: true,
            loop: true,
            observer: true,
            observeParents: true,
            // If we need pagination
            pagination: '.swiper-pagination',
            paginationClickable: true,
            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    };


    // -------------------------------
    // detect device / breakpoints
    // -------------------------------


    var getDimensions = function() {

        var breakpoints = {
                xl: 1280,
                l: 1024,
                m: 768,
                s: 568
            },
            height = $(window).height(),
            width = $(window).width();

        if (width < (breakpoints.s - 1))
            return 'Small Phone';
        if (width > breakpoints.s && width < (breakpoints.m - 1))
            return 'Big Phone';
        if (width > breakpoints.m && width < (breakpoints.l - 1))
            return 'Tablet';
        if (width > breakpoints.l && width < (breakpoints.xl - 1))
            return 'Laptop';
        if (width > breakpoints.xl)
            return 'Desktop';
    };


    // gets default size for debugging reasons
    getDimensions();
    console.log('default device: ' + getDimensions());
    // gets default size for debugging reasons

    // -------------------------------
    // detectDevice - chooses slider
    // -------------------------------

    var detectDevice = function(device) {

        initSlider();
        var isFullScreen = document.fullscreen;
        //gimmick on touch devices which support fullscreen
        // > allow fullscreen slider for better immersion
        // if user is on a touchscreen device
        if (Modernizr.touch) {
            console.log('Touch Screen');
            loadScript('/resources/screenfulljs/screenfull.js');
        } else {
            console.log('No Touch Screen');
        }
    };


    // init with detecting screen size    
    detectDevice(getDimensions());

    // // LATER TODO: update on change
    // $(window).resize(function() {
    //     console.log('device change: ' + getDimensions());
    //     detectDevice (getDimensions());
    // });
    // $(window).on("orientationchange",function(){
    //     detectDevice (getDimensions());
    // });


});
