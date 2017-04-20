// change active class if new section is reached

$(function () { 

    // fixed sidebar
    var sidebar = $('.sidebar'),
        top = sidebar.offset().top,
        offset = 50; // from top

    $(window).scroll(function(event) {

        var y = $(this).scrollTop();

        // fix sidenav
        if (y >= top - offset)
            sidebar.addClass('fixed');
        else
            sidebar.removeClass('fixed');


    });


    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        // make sure it only fires once
        e.preventDefault();
        $(document).off("scroll");

        // active class management
        $('.sidebar a').each(function () {
            $(this).parent().removeClass('active').addClass('light');
        });
        $(this).parent().removeClass('light').addClass('active');

      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {

            window.location.hash = target;
            history.replaceState("", document.title, window.location.pathname);
            
            $(document).on("scroll", onScroll);

        });
    });



    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('.sidebar a').each(function () {

            var currLink = $(this),
                refElement = $(currLink.attr("href"));

            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.sidebar ul li a').parent().removeClass("active").addClass('light');
                currLink.parent().removeClass('light').addClass("active");
            }
            else{
                currLink.parent().removeClass("active").addClass('light');
            }
        });
    }

});